const express = require('express');
const router = express.Router();
const { createDemoAccount } = require('../controllers/demoAccountController');

// POST /api/demo-accounts
router.post('/', createDemoAccount);

module.exports = router;
