const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

// POST /api/transfer - Transfer funds between accounts/wallets
router.post('/', transferController.transferFunds);

// POST /api/transfer/external-deposit - Deposit from external source (M-Pesa)
router.post('/external-deposit', transferController.externalDeposit);

// POST /api/transfer/initialize-deposits - Initialize totalDeposits for existing accounts (one-time migration)
router.post('/initialize-deposits', transferController.initializeDeposits);

module.exports = router;
