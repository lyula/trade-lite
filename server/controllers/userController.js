const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 15 } = req.query;
    const skip = (page - 1) * limit;
    const users = await User.find()
      .sort({ _id: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await User.countDocuments();
    return res.status(200).json({ users, total });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};


