const DemoAccount = require('../models/DemoAccount');
const User = require('../models/User');

// Helper to generate unique 7-digit trading account number starting with 677
async function generateUniqueTradingAccountNumber() {
  let unique = false;
  let accountNumber;
  while (!unique) {
    accountNumber = '677' + Math.floor(1000 + Math.random() * 9000).toString();
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
      equity: 0,
      balance: 0,
      margin: 0,
      credit: 0
    });
    await demoAccount.save();
    res.status(201).json({ success: true, account: demoAccount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
