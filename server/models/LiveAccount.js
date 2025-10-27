const mongoose = require('mongoose');




const LiveAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  accountType: { type: String, required: true },
  currency: { type: String, required: true },
  leverage: { type: String, required: true },
  platform: { type: String, enum: ['web-based', 'automated'], required: true },
  tradingAccountNumber: { type: String, required: true, unique: true },
  equity: { type: Number, default: 0 },
  balance: { type: Number, default: 0 }, // Main balance in selected currency
  usdBalance: { type: Number, default: 0 }, // Always store USD equivalent
  kesBalance: { type: Number, default: 0 }, // Always store KES equivalent
  margin: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LiveAccount', LiveAccountSchema);
