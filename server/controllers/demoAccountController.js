// DELETE demo account by ID
exports.deleteDemoAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await DemoAccount.findById(id);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Demo account not found' });
    }
    await DemoAccount.deleteOne({ _id: id });
    res.json({ success: true, message: 'Demo account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const DemoAccount = require('../models/DemoAccount');
const User = require('../models/User');

// GET demo accounts by userId
exports.getDemoAccountsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'Missing userId' });
    }
    const accounts = await DemoAccount.find({ userId });
    res.json({ success: true, accounts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Helper to generate unique 7-digit trading account number starting with 834
async function generateUniqueTradingAccountNumber() {
  let unique = false;
  let accountNumber;
  while (!unique) {
    accountNumber = '834' + Math.floor(1000 + Math.random() * 9000).toString();
    // Ensure uniqueness
    const exists = await DemoAccount.findOne({ tradingAccountNumber: accountNumber });
    if (!exists) unique = true;
  }
  return accountNumber;
}

exports.createDemoAccount = async (req, res) => {
  try {
    const { userId, accountType, currency, leverage, platform } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const tradingAccountNumber = await generateUniqueTradingAccountNumber();
    const demoAccount = new DemoAccount({
      userId,
      firstName: user.firstName,
      accountType,
      currency,
      leverage,
      platform,
      tradingAccountNumber,
      equity: 10000,
      balance: 10000,
      margin: 0
    });
    await demoAccount.save();
    res.status(201).json({ success: true, account: demoAccount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
