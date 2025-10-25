const mongoose = require('mongoose');

const ConversionRateSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  base: { type: String, default: 'USD' },
  target: { type: String, default: 'KES' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConversionRate', ConversionRateSchema);
