const ConversionRate = require('../models/ConversionRate');
const axios = require('axios');

// Get latest conversion rate
exports.getLatestRate = async (req, res) => {
  try {
    let latest = await ConversionRate.findOne().sort({ updatedAt: -1 });
    if (!latest) {
      // Set default value if no rate exists
      latest = await ConversionRate.create({ rate: 130, base: 'USD', target: 'KES', updatedAt: new Date() });
    }
    res.json({ rate: latest.rate, updatedAt: latest.updatedAt });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversion rate.' });
  }
};

// Update conversion rate from API
exports.updateRate = async () => {
  try {
    const response = await axios.get('https://api.exchangerate.host/latest?base=USD&symbols=KES');
    const rate = response.data.rates.KES;
    await ConversionRate.create({ rate, updatedAt: new Date() });
    console.log(`Updated KES/USD rate: ${rate}`);
  } catch (err) {
    console.error('Failed to update conversion rate:', err.message);
  }
};
