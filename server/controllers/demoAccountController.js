// GET all demo accounts (admin view) with pagination and ordering
exports.getAllDemoAccounts = async (req, res) => {
  try {
    let { page = 1, limit = 20, sort = "createdAt" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    // Prefetch previous 10, current, and next 10 pages
    let { prefetch = 10 } = req.query;
    prefetch = parseInt(prefetch);
    const startPage = Math.max(1, page - prefetch);
    const endPage = page + prefetch;
    const total = await DemoAccount.countDocuments();
    const allAccounts = await DemoAccount.find({})
      .sort({ createdAt: 1 });

    // Slice for requested pages
    const pagedAccounts = allAccounts.slice((startPage - 1) * limit, endPage * limit);

    // Reverse for display: oldest at bottom, newest at top
    const reversedAccounts = [...pagedAccounts].reverse();

    // Numbering: oldest is #1, newest is #total
    const numberedAccounts = reversedAccounts.map((acc, idx) => ({
      number: total - ((startPage - 1) * limit + idx),
      ...acc._doc,
    }));

    res.json({ success: true, accounts: numberedAccounts, total, startPage, endPage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
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
