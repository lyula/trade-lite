const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');


// Create wallet
router.post('/create', walletController.createWallet);

// Get wallets by userId
router.get('/', walletController.getWalletsByUser);


// GET /api/wallets/all?page=1&limit=20&sort=createdAt
const { getAllWallets } = require('../controllers/walletController');
router.get('/all', getAllWallets);

module.exports = router;
