const express = require('express');
const router = express.Router();
const { createLiveAccount, getLiveAccountsByUser } = require('../controllers/liveAccountController');


// POST /api/live-accounts
router.post('/', createLiveAccount);

// GET /api/live-accounts?userId=xxx
router.get('/', getLiveAccountsByUser);

module.exports = router;
