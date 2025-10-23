const express = require('express');
const router = express.Router();
const { createOrSyncUser, getAllUsers } = require('../controllers/userController');
// Get all users
router.get('/', getAllUsers);

// Create user after Clerk signup
router.post('/signup', createOrSyncUser);

module.exports = router;
