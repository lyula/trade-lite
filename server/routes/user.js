const express = require('express');
const router = express.Router();
const { createOrSyncUser, getAllUsers } = require('../controllers/userController');
// Get all users
router.get('/', getAllUsers);


module.exports = router;
