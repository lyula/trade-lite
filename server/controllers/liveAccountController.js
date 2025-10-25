// DELETE live account by ID
exports.deleteLiveAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await LiveAccount.findById(id);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Live account not found' });
    }
    await LiveAccount.deleteOne({ _id: id });
    res.json({ success: true, message: 'Live account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// GET live accounts by userId
exports.getLiveAccountsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'Missing userId' });
    }
    const accounts = await LiveAccount.find({ userId });
    res.json({ success: true, accounts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const LiveAccount = require('../models/LiveAccount');
const User = require('../models/User');

// Helper to generate unique 7-digit trading account number starting with 677
async function generateUniqueTradingAccountNumber() {
  let unique = false;
  let accountNumber;
  while (!unique) {
    accountNumber = '677' + Math.floor(1000 + Math.random() * 9000).toString();
    // Ensure uniqueness
    const exists = await LiveAccount.findOne({ tradingAccountNumber: accountNumber });
    if (!exists) unique = true;
  }
  return accountNumber;
}

exports.createLiveAccount = async (req, res) => {
  try {
  const { userId, accountType, currency, leverage, platform } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const tradingAccountNumber = await generateUniqueTradingAccountNumber();
    const liveAccount = new LiveAccount({
      userId,
      firstName: user.firstName,
      accountType,
      currency,
      leverage,
      platform,
      tradingAccountNumber,
      equity: 0,
      balance: 0,
      margin: 0,
      credit: 0
    });
    await liveAccount.save();
    res.status(201).json({ success: true, account: liveAccount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
