const express = require('express');
const router = express.Router();
const {
  getAccountTrades,
  startAutomatedTrading,
  stopAutomatedTrading,
  updateTradePrices,
  processAutomatedTradingCycle
} = require('../controllers/automatedTradingController');

// Get trades for an account
router.get('/trades', getAccountTrades);

// Start automated trading for an account
router.post('/start', startAutomatedTrading);

// Stop automated trading for an account
router.post('/stop', stopAutomatedTrading);

// Update prices for open trades
router.post('/update-prices', updateTradePrices);

// Process trading cycle (close old, open new)
router.post('/cycle', processAutomatedTradingCycle);

module.exports = router;

