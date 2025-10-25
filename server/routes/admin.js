const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/adminController');
// Get all admins
router.get('/list', getAllAdmins);

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
