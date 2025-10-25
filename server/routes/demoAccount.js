const express = require('express');
const router = express.Router();
const { createDemoAccount, getDemoAccountsByUser } = require('../controllers/demoAccountController');

// GET /api/demo-accounts (by userId)
router.get('/', getDemoAccountsByUser);

// POST /api/demo-accounts
router.post('/', createDemoAccount);

module.exports = router;
