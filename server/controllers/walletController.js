const { sendAccountEmail } = require('../utils/emailSender');
// GET all wallets (admin view) with pagination and ordering
exports.getAllWallets = async (req, res) => {
  try {
    let { page = 1, limit = 20, sort = "createdAt" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const wallets = await Wallet.find({})
      .populate("userId", "firstName lastName email referralCode")
      .sort({ [sort]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Wallet.countDocuments();

    // Numbering: oldest is #1, newest is #total
    const numberedWallets = wallets.map((wallet, idx) => ({
      number: (page - 1) * limit + idx + 1,
      ...wallet._doc,
      user: wallet.userId,
    }));

    res.json({ success: true, wallets: numberedWallets, total });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// GET wallets by userId
exports.getWalletsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'Missing userId' });
    }
    const wallets = await Wallet.find({ userId });
    res.json({ success: true, wallets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const Wallet = require('../models/Wallet');
const User = require('../models/User');



function generateWalletId(userId) {
  // Use last 4 digits of userId (or pad if not enough digits)
  let digits = (userId || '').replace(/\D/g, '');
  if (digits.length < 4) {
    digits = digits.padStart(4, '0');
  } else {
    digits = digits.slice(-4);
  }
  return `W-3387-${digits}`;
}

exports.createWallet = async (req, res) => {
  try {
    const { userId, currency, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Only allow one wallet per currency (USD and KES)
    if (currency !== 'USD' && currency !== 'KES') {
      return res.status(400).json({ success: false, error: 'Only USD and KES wallets are allowed.' });
    }
    const existingWallet = await Wallet.findOne({ userId, currency });
    if (existingWallet) {
      return res.status(400).json({ success: false, error: `You already have a wallet in ${currency}.` });
    }

    let walletId = generateWalletId(userId);
    // Ensure uniqueness in case multiple wallets per user
    let suffix = 1;
    let candidateId = walletId;
    while (await Wallet.findOne({ walletId: candidateId })) {
      candidateId = `${walletId}-${suffix}`;
      suffix++;
    }
    walletId = candidateId;
    const wallet = new Wallet({
      userId,
      firstName: user.firstName,
      referralCode: user.referralCode || '',
      balance: 0,
      currency,
      password,
      walletId
    });

    // Send email to user BEFORE saving (so password is not hashed)
    if (user.email) {
      const walletDetails = `Wallet ID: ${walletId}\nCurrency: ${currency}\nPassword: ${password}`;
      try {
        await sendAccountEmail({
          to: user.email,
          subject: 'Your Wallet Account Details',
          accountDetails: walletDetails,
          type: 'Wallet',
        });
      } catch (emailErr) {
        // Optionally log email error
        console.error('Failed to send wallet account email:', emailErr);
      }
    }

    await wallet.save();
    res.status(201).json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
