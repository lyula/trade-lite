const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/adminController');
const { initializeDeposits } = require('../controllers/transferController');

// Get all admins
router.get('/list', getAllAdmins);

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// One-time migration to initialize totalDeposits for existing accounts
router.post('/initialize-deposits', initializeDeposits);

module.exports = router;
