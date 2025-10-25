const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/Withdrawal');

exports.getRecentActivity = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'Missing userId' });
    }
    const deposits = await Deposit.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const withdrawals = await Withdrawal.find({ userId }).sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, deposits, withdrawals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
