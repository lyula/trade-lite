const express = require('express');
const router = express.Router();
const { getLatestRate } = require('../controllers/conversionController');

router.get('/', getLatestRate);

module.exports = router;
