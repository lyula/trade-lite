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
  balance: { type: Number, default: 0 }, // Total balance (deposits + profits)
  totalDeposits: { type: Number, default: 0 }, // Track total deposits made
  totalProfits: { type: Number, default: 0 }, // Track total profits earned
  withdrawableBalance: { type: Number, default: 0 }, // Only profits are withdrawable
  usdBalance: { type: Number, default: 0 }, // Always store USD equivalent
  kesBalance: { type: Number, default: 0 }, // Always store KES equivalent
  margin: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  isAutomatedTradingActive: { type: Boolean, default: false }, // Track if automated trading is active
  lastTradingCycleAt: { type: Date }, // Track last cycle execution
  dailyProfitTarget: { type: Number, default: 0 }, // Daily profit target
  dailyProfitEarned: { type: Number, default: 0 }, // Profit earned today
  lastProfitResetDate: { type: Date }, // Last date profits were reset
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LiveAccount', LiveAccountSchema);
