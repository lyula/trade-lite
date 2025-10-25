const express = require('express');
const router = express.Router();
const { createLiveAccount, getLiveAccountsByUser, deleteLiveAccount } = require('../controllers/liveAccountController');


// POST /api/live-accounts
router.post('/', createLiveAccount);

// GET /api/live-accounts?userId=xxx
router.get('/', getLiveAccountsByUser);

// GET /api/live-accounts/all?page=1&limit=20&sort=createdAt
const { getAllLiveAccounts } = require('../controllers/liveAccountController');
router.get('/all', getAllLiveAccounts);

module.exports = router;

// DELETE /api/live-accounts/:id
router.delete('/:id', deleteLiveAccount);
