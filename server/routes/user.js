const express = require('express');
const router = express.Router();
const { createOrSyncUser, getAllUsers } = require('../controllers/userController');
const User = require('../models/User');

// Get all users
router.get('/', getAllUsers);

// Search users by referral code, owner at top, followed by referred users
router.get('/search-by-referral', async (req, res) => {
	try {
		const { referralCode, page = 1, limit = 15 } = req.query;
		if (!referralCode) return res.status(400).json({ message: 'Referral code required' });

		// Find owner of the referral code
		const owner = await User.findOne({ referralCode });
		if (!owner) return res.status(404).json({ message: 'Referral code owner not found' });

		// Find users referred by this code
		const referred = await User.find({ referredBy: referralCode })
			.sort({ _id: -1 })
			.skip((page - 1) * limit)
			.limit(Number(limit));

		// Total count for pagination
		const total = await User.countDocuments({ referredBy: referralCode });

		// Combine owner and referred users
		const users = [owner, ...referred];
		res.json({ users, total: total + 1 });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});


module.exports = router;
