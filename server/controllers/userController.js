const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.createOrSyncUser = async (req, res) => {
  const { clerkId, firstName, lastName } = req.body;
  if (!clerkId || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({ clerkId, firstName, lastName });
    }
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};
