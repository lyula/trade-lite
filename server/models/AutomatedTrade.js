const mongoose = require('mongoose');

const AutomatedTradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, required: true },
  accountType: { type: String, enum: ['demo', 'live'], required: true },
  tradingAccountNumber: { type: String, required: true },
  
  // Trade details
  pair: { type: String, required: true }, // e.g., BTC/USD, ETH/USD
  type: { type: String, enum: ['buy', 'sell'], required: true },
  amount: { type: Number, required: true },
  entryPrice: { type: Number, required: true },
  currentPrice: { type: Number }, // For tracking unrealized P&L
  exitPrice: { type: Number },
  
  // Status and results
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  profit: { type: Number, default: 0 },
  profitPercentage: { type: Number, default: 0 },
  unrealizedProfit: { type: Number, default: 0 }, // Current P&L for open trades
  unrealizedProfitPercentage: { type: Number, default: 0 },
  
  // Timestamps
  openedAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
  
  // Bot metadata
  isAutomated: { type: Boolean, default: true }
});

// Index for faster queries
AutomatedTradeSchema.index({ userId: 1, accountId: 1, status: 1 });
AutomatedTradeSchema.index({ tradingAccountNumber: 1, status: 1 });

module.exports = mongoose.model('AutomatedTrade', AutomatedTradeSchema);
