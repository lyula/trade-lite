const mongoose = require('mongoose');

const DemoAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  accountType: { type: String, required: true },
  currency: { type: String, required: true },
  leverage: { type: String, required: true },
  platform: { type: String, enum: ['web-based', 'automated'], required: true },
  tradingAccountNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DemoAccount', DemoAccountSchema);
