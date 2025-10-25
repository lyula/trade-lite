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
    await wallet.save();
    res.status(201).json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
