const User = require('../models/User');


exports.getAllUsers = async (req, res) => {
  try {
    // If email query param is present, check for existence
    if (req.query.email) {
      const user = await User.findOne({ email: req.query.email });
      if (user) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(404).json({ exists: false, message: 'Account does not exist' });
      }
    }
    // Otherwise, return paginated users
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


