const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');


// Create wallet
router.post('/create', walletController.createWallet);

// Get wallets by userId
router.get('/', walletController.getWalletsByUser);

module.exports = router;
