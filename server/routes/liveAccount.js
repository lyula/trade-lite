const express = require('express');
const router = express.Router();
const { createLiveAccount, getLiveAccountsByUser, deleteLiveAccount } = require('../controllers/liveAccountController');


// POST /api/live-accounts
router.post('/', createLiveAccount);

// GET /api/live-accounts?userId=xxx
router.get('/', getLiveAccountsByUser);

module.exports = router;

// DELETE /api/live-accounts/:id
router.delete('/:id', deleteLiveAccount);
