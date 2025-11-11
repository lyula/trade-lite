const mongoose = require('mongoose');




const DemoAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  accountType: { type: String, required: true },
  currency: { type: String, required: true },
  leverage: { type: String, required: true },
  platform: { type: String, enum: ['web-based', 'automated'], required: true },
  tradingAccountNumber: { type: String, required: true, unique: true },
  equity: { type: Number, default: 10000 },
  balance: { type: Number, default: 10000 },
  totalDeposits: { type: Number, default: 10000 }, // Track total deposits made
  totalProfits: { type: Number, default: 0 }, // Track total profits earned
  withdrawableBalance: { type: Number, default: 0 }, // Only profits are withdrawable
  margin: { type: Number, default: 0 },
  isAutomatedTradingActive: { type: Boolean, default: false }, // Track if automated trading is active
  lastTradingCycleAt: { type: Date }, // Track last cycle execution
  dailyProfitTarget: { type: Number, default: 0 }, // Daily profit target
  dailyProfitEarned: { type: Number, default: 0 }, // Profit earned today
  lastProfitResetDate: { type: Date }, // Last date profits were reset
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DemoAccount', DemoAccountSchema);
