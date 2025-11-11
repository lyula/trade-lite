const AutomatedTrade = require('../models/AutomatedTrade');
const LiveAccount = require('../models/LiveAccount');
const DemoAccount = require('../models/DemoAccount');

// Crypto pairs to randomly select from
const CRYPTO_PAIRS = [
  'BTC/USD', 'ETH/USD', 'BNB/USD', 'SOL/USD', 
  'XRP/USD', 'ADA/USD', 'DOGE/USD', 'MATIC/USD',
  'DOT/USD', 'AVAX/USD', 'LINK/USD', 'UNI/USD'
];

// Get random crypto pair
const getRandomPair = () => {
  return CRYPTO_PAIRS[Math.floor(Math.random() * CRYPTO_PAIRS.length)];
};

// Get random price for a crypto pair
const getRandomPrice = (pair) => {
  const basePrices = {
    'BTC/USD': 50000,
    'ETH/USD': 3000,
    'BNB/USD': 500,
    'SOL/USD': 100,
    'XRP/USD': 0.6,
    'ADA/USD': 0.5,
    'DOGE/USD': 0.08,
    'MATIC/USD': 1.2,
    'DOT/USD': 8,
    'AVAX/USD': 40,
    'LINK/USD': 15,
    'UNI/USD': 7
  };
  
  const basePrice = basePrices[pair] || 100;
  const variation = (Math.random() - 0.5) * 0.1 * basePrice; // ±10% variation
  return basePrice + variation;
};

// Generate automated trades for an account
const generateAutomatedTrades = async (userId, accountId, accountType, tradingAccountNumber, accountBalance) => {
  try {
    // Determine number of trades to generate (1-2 trades for gradual profit accumulation)
    const numTrades = Math.floor(Math.random() * 2) + 1; // 1-2 trades instead of 1-3
    const trades = [];
    
    for (let i = 0; i < numTrades; i++) {
      const pair = getRandomPair();
      const entryPrice = getRandomPrice(pair);
      const type = Math.random() > 0.5 ? 'buy' : 'sell';
      
      // Calculate trade amount (5-15% of account balance)
      const percentage = 0.05 + Math.random() * 0.1; // 5-15%
      const amount = accountBalance * percentage;
      
      // Start trade in slight drawdown (realistic market entry)
      const initialDrawdownPercent = -(0.005 + Math.random() * 0.015); // -0.5% to -2% initial drawdown
      const currentPrice = entryPrice * (1 + initialDrawdownPercent);
      
      // Calculate initial unrealized P&L (will be negative initially)
      const priceChange = currentPrice - entryPrice;
      const unrealizedProfit = type === 'buy' 
        ? (priceChange / entryPrice) * amount 
        : -(priceChange / entryPrice) * amount;
      const unrealizedProfitPercentage = (unrealizedProfit / amount) * 100;
      
      const trade = new AutomatedTrade({
        userId,
        accountId,
        accountType,
        tradingAccountNumber,
        pair,
        type,
        amount,
        entryPrice,
        currentPrice,
        unrealizedProfit,
        unrealizedProfitPercentage,
        status: 'open',
        openedAt: new Date()
      });
      
      await trade.save();
      trades.push(trade);
    }
    
    return trades;
  } catch (error) {
    console.error('Error generating automated trades:', error);
    throw error;
  }
};

// Close trades with profit for an account (respecting daily limits)
const closeTradesWithProfit = async (accountType, tradingAccountNumber, maxTradesToClose = null) => {
  try {
    // Get account first
    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    const account = await Model.findOne({ tradingAccountNumber });
    
    if (!account) {
      return { closedTrades: 0, totalProfit: 0 };
    }

    // Check if we need to reset daily profit counter
    const today = new Date().toDateString();
    const lastResetDate = account.lastProfitResetDate ? new Date(account.lastProfitResetDate).toDateString() : null;
    
    if (lastResetDate !== today) {
      // New day - reset daily profit counter and set new target
      const currentBalance = account.balance;
      let minDailyProfit, maxDailyProfit;
      
      if (accountType === 'demo') {
        minDailyProfit = 0.07; // 7%
        maxDailyProfit = 0.20; // 20%
      } else {
        minDailyProfit = 0.015; // 1.5%
        maxDailyProfit = 0.02; // 2%
      }
      
      // Set random daily profit target within range
      const dailyProfitPercentage = minDailyProfit + Math.random() * (maxDailyProfit - minDailyProfit);
      account.dailyProfitTarget = currentBalance * dailyProfitPercentage;
      account.dailyProfitEarned = 0;
      account.lastProfitResetDate = new Date();
    }

    // Check if daily profit target already reached
    if (account.dailyProfitEarned >= account.dailyProfitTarget) {
      return { closedTrades: 0, totalProfit: 0, message: 'Daily profit target already reached' };
    }

    // Get open trades
    let openTrades = await AutomatedTrade.find({
      accountType,
      tradingAccountNumber,
      status: 'open'
    });
    
    if (openTrades.length === 0) {
      return { closedTrades: 0, totalProfit: 0 };
    }

    // If maxTradesToClose is specified and less than total open trades, 
    // randomly select that many trades to close (for gradual profit accumulation)
    if (maxTradesToClose && maxTradesToClose < openTrades.length) {
      openTrades = openTrades.sort(() => Math.random() - 0.5).slice(0, maxTradesToClose);
    }

    // Calculate remaining profit needed to reach target
    const remainingProfitNeeded = account.dailyProfitTarget - account.dailyProfitEarned;
    
    let netProfit = 0; // Track net profit (wins - losses)
    const closedTrades = [];
    
    // GUARANTEE a mix of wins and losses in every cycle
    // Pre-determine which trades will be wins vs losses
    const tradeOutcomes = [];
    const numTrades = openTrades.length;
    
    if (numTrades > 0) {
      // Ensure at least 1 loss if we have 2+ trades, at least 1 win always
      const minLosses = numTrades >= 2 ? 1 : 0;
      const minWins = 1;
      
      // Calculate number of wins (60-70% win rate, but ensure mix)
      let numWins = Math.max(minWins, Math.floor(numTrades * (0.60 + Math.random() * 0.10)));
      let numLosses = numTrades - numWins;
      
      // Ensure we have at least minLosses
      if (numLosses < minLosses && numTrades >= 2) {
        numLosses = minLosses;
        numWins = numTrades - numLosses;
      }
      
      // Create array of outcomes
      for (let i = 0; i < numWins; i++) tradeOutcomes.push(true); // wins
      for (let i = 0; i < numLosses; i++) tradeOutcomes.push(false); // losses
      
      // Shuffle the outcomes for randomness
      for (let i = tradeOutcomes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tradeOutcomes[i], tradeOutcomes[j]] = [tradeOutcomes[j], tradeOutcomes[i]];
      }
    }
    
    // Close trades with predetermined mix of wins and losses
    for (let i = 0; i < openTrades.length; i++) {
      const trade = openTrades[i];
      
      if (netProfit >= remainingProfitNeeded) {
        break; // Stop if we've reached the daily target
      }
      
      // Use predetermined outcome
      const isWin = tradeOutcomes[i];
      
      let profit;
      
      if (isWin) {
        // Winning trade: 1% to 20% profit
        const maxProfitForTrade = trade.amount * 0.20; // Max 20% profit per trade
        const minProfitForTrade = trade.amount * 0.01; // Min 1% profit per trade
        
        // If we're close to daily target, make sure we don't overshoot too much
        const remainingNeeded = remainingProfitNeeded - netProfit;
        const cappedMax = Math.min(maxProfitForTrade, remainingNeeded * 2); // Allow some overshoot
        
        profit = minProfitForTrade + Math.random() * (cappedMax - minProfitForTrade);
      } else {
        // Losing trade: -1% to -8% loss
        const maxLoss = trade.amount * 0.08; // Max 8% loss
        const minLoss = trade.amount * 0.01; // Min 1% loss
        profit = -(minLoss + Math.random() * (maxLoss - minLoss));
        
        // Make sure we don't create too much loss that we can't recover
        // If this loss would make it impossible to reach target, make it a smaller loss
        const remainingTrades = openTrades.length - i - 1;
        if (remainingTrades > 0) {
          const potentialMaxProfit = remainingTrades * (trade.amount * 0.20);
          const neededAfterThisLoss = remainingProfitNeeded - (netProfit + profit);
          
          if (neededAfterThisLoss > potentialMaxProfit) {
            // Reduce the loss to make target achievable
            profit = -(trade.amount * 0.02); // Small 2% loss
          }
        }
      }
      
      // Calculate exit price based on profit/loss
      const profitPercentage = (profit / trade.amount) * 100;
      const priceChange = (profit / trade.amount) * trade.entryPrice;
      const exitPrice = trade.type === 'buy' 
        ? trade.entryPrice + priceChange 
        : trade.entryPrice - priceChange;
      
      trade.status = 'closed';
      trade.exitPrice = exitPrice;
      trade.profit = profit;
      trade.profitPercentage = profitPercentage;
      trade.closedAt = new Date();
      
      await trade.save();
      netProfit += profit;
      closedTrades.push(trade);
    }
    
    // If we haven't reached the target yet, adjust the last few winning trades to hit it
    if (netProfit < remainingProfitNeeded && closedTrades.length > 0) {
      const deficit = remainingProfitNeeded - netProfit;
      
      // Find the last winning trade and boost it
      for (let i = closedTrades.length - 1; i >= 0; i--) {
        const trade = closedTrades[i];
        if (trade.profit > 0) {
          // Add the deficit to this trade
          trade.profit += deficit;
          trade.profitPercentage = (trade.profit / trade.amount) * 100;
          
          // Recalculate exit price
          const priceChange = (trade.profit / trade.amount) * trade.entryPrice;
          trade.exitPrice = trade.type === 'buy' 
            ? trade.entryPrice + priceChange 
            : trade.entryPrice - priceChange;
          
          await trade.save();
          netProfit += deficit;
          break;
        }
      }
    }
    
    return { closedTrades: closedTrades.length, totalProfit: netProfit, trades: closedTrades };
  } catch (error) {
    console.error('Error closing trades:', error);
    throw error;
  }
};

// Update open trades with price fluctuations and calculate unrealized P&L
const updateOpenTradesPrices = async (accountType, tradingAccountNumber) => {
  try {
    // Get all open trades
    const openTrades = await AutomatedTrade.find({
      accountType,
      tradingAccountNumber,
      status: 'open'
    });

    if (openTrades.length === 0) {
      return { updatedTrades: 0, totalUnrealizedPnL: 0 };
    }

    let totalUnrealizedPnL = 0;

    for (const trade of openTrades) {
      // Simulate price movement: -3% to +5% from current/entry price
      // Prices fluctuate more dramatically before settling
      const basePrice = trade.currentPrice || trade.entryPrice;
      const volatility = 0.03 + Math.random() * 0.05; // 3-8% movement
      const direction = Math.random() > 0.5 ? 1 : -1;
      const priceChangePercent = direction * Math.random() * volatility;
      
      // New current price
      const newCurrentPrice = basePrice * (1 + priceChangePercent);
      
      // Calculate unrealized P&L
      const priceChange = newCurrentPrice - trade.entryPrice;
      const unrealizedProfit = trade.type === 'buy' 
        ? (priceChange / trade.entryPrice) * trade.amount 
        : -(priceChange / trade.entryPrice) * trade.amount;
      const unrealizedProfitPercentage = (unrealizedProfit / trade.amount) * 100;

      // Update trade
      trade.currentPrice = newCurrentPrice;
      trade.unrealizedProfit = unrealizedProfit;
      trade.unrealizedProfitPercentage = unrealizedProfitPercentage;
      
      await trade.save();
      totalUnrealizedPnL += unrealizedProfit;
    }

    // Update account equity based on unrealized P&L
    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    const account = await Model.findOne({ tradingAccountNumber });
    
    if (account) {
      // Equity = Balance + Unrealized P&L
      account.equity = account.balance + totalUnrealizedPnL;
      await account.save();
    }

    return { 
      updatedTrades: openTrades.length, 
      totalUnrealizedPnL,
      updatedEquity: account ? account.equity : 0
    };
  } catch (error) {
    console.error('Error updating open trades prices:', error);
    throw error;
  }
};

// Update account balances with profits
const updateAccountBalance = async (accountType, accountId, profit) => {
  try {
    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    const account = await Model.findById(accountId);
    
    if (!account) {
      throw new Error('Account not found');
    }
    
    // Add profit to balance and equity
    account.balance += profit;
    account.equity += profit;
    
    // Track profits separately from deposits
    account.totalProfits += profit;
    account.withdrawableBalance += profit; // Only profits are withdrawable
    
    // Update daily profit earned
    account.dailyProfitEarned = (account.dailyProfitEarned || 0) + profit;
    
    await account.save();
    
    return account;
  } catch (error) {
    console.error('Error updating account balance:', error);
    throw error;
  }
};

// Get trades for an account
const getAccountTrades = async (req, res) => {
  try {
    const { accountType, tradingAccountNumber } = req.query;
    
    if (!accountType || !tradingAccountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Account type and trading account number are required'
      });
    }
    
    const trades = await AutomatedTrade.find({
      accountType,
      tradingAccountNumber
    }).sort({ openedAt: -1 }).limit(100);
    
    return res.status(200).json({
      success: true,
      trades
    });
  } catch (error) {
    console.error('Error fetching trades:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching trades'
    });
  }
};

// Start automated trading for an account
const startAutomatedTrading = async (req, res) => {
  try {
    const { userId, accountId, accountType, tradingAccountNumber } = req.body;
    
    if (!userId || !accountId || !accountType || !tradingAccountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Get account balance
    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    const account = await Model.findById(accountId);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }
    
    if (account.balance <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance to start trading'
      });
    }
    
    // Mark automated trading as active
    account.isAutomatedTradingActive = true;
    
    // Initialize daily profit target if not set
    if (!account.dailyProfitTarget || !account.lastProfitResetDate) {
      const currentBalance = account.balance;
      let minDailyProfit, maxDailyProfit;
      
      if (accountType === 'demo') {
        minDailyProfit = 0.07; // 7%
        maxDailyProfit = 0.20; // 20%
      } else {
        minDailyProfit = 0.015; // 1.5%
        maxDailyProfit = 0.02; // 2%
      }
      
      const dailyProfitPercentage = minDailyProfit + Math.random() * (maxDailyProfit - minDailyProfit);
      account.dailyProfitTarget = currentBalance * dailyProfitPercentage;
      account.dailyProfitEarned = 0;
      account.lastProfitResetDate = new Date();
    }
    
    await account.save();
    
    // Generate initial trades
    const trades = await generateAutomatedTrades(
      userId,
      accountId,
      accountType,
      tradingAccountNumber,
      account.balance
    );
    
    return res.status(200).json({
      success: true,
      message: 'Automated trading started',
      trades,
      dailyProfitTarget: account.dailyProfitTarget,
      dailyProfitEarned: account.dailyProfitEarned
    });
  } catch (error) {
    console.error('Error starting automated trading:', error);
    return res.status(500).json({
      success: false,
      message: 'Error starting automated trading'
    });
  }
};

// Process automated trading cycle (close old trades, open new ones)
const processAutomatedTradingCycle = async (req, res) => {
  try {
    const { accountType, accountId, tradingAccountNumber } = req.body;
    
    if (!accountType || !accountId || !tradingAccountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Get account to check if trading is active
    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    const account = await Model.findById(accountId);
    
    if (!account || !account.isAutomatedTradingActive) {
      return res.status(400).json({
        success: false,
        message: 'Automated trading is not active for this account'
      });
    }
    
    // Close open trades with profit
    const { closedTrades, totalProfit, trades, message } = await closeTradesWithProfit(
      accountType,
      tradingAccountNumber
    );
    
    // Update account balance if there's profit
    if (totalProfit > 0) {
      await updateAccountBalance(accountType, accountId, totalProfit);
    }
    
    // Get updated account
    const updatedAccount = await Model.findById(accountId);
    
    // Only generate new trades if we haven't reached daily profit target
    let newTrades = [];
    if (updatedAccount.dailyProfitEarned < updatedAccount.dailyProfitTarget) {
      newTrades = await generateAutomatedTrades(
        updatedAccount.userId,
        accountId,
        accountType,
        tradingAccountNumber,
        updatedAccount.balance
      );
    }
    
    // Update last cycle time
    updatedAccount.lastTradingCycleAt = new Date();
    await updatedAccount.save();
    
    return res.status(200).json({
      success: true,
      closedTrades,
      totalProfit,
      newTrades: newTrades.length,
      updatedBalance: updatedAccount.balance,
      updatedEquity: updatedAccount.equity,
      withdrawableBalance: updatedAccount.withdrawableBalance,
      dailyProfitTarget: updatedAccount.dailyProfitTarget,
      dailyProfitEarned: updatedAccount.dailyProfitEarned,
      message: message || 'Trading cycle completed'
    });
  } catch (error) {
    console.error('Error processing trading cycle:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing trading cycle'
    });
  }
};

// Stop automated trading
const stopAutomatedTrading = async (req, res) => {
  try {
    const { accountType, accountId, tradingAccountNumber } = req.body;

    if (!accountType || (!accountId && !tradingAccountNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    
    // Find account
    const account = accountId 
      ? await Model.findById(accountId)
      : await Model.findOne({ tradingAccountNumber });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    // Set automated trading to inactive
    account.isAutomatedTradingActive = false;
    await account.save();

    return res.status(200).json({
      success: true,
      message: 'Automated trading stopped successfully'
    });
  } catch (error) {
    console.error('Error stopping automated trading:', error);
    return res.status(500).json({
      success: false,
      message: 'Error stopping automated trading'
    });
  }
};

// Update prices for open trades (controller endpoint)
const updateTradePrices = async (req, res) => {
  try {
    const { accountType, accountId, tradingAccountNumber } = req.body;

    if (!accountType || (!accountId && !tradingAccountNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const Model = accountType === 'demo' ? DemoAccount : LiveAccount;
    
    // Find account
    const account = accountId 
      ? await Model.findById(accountId)
      : await Model.findOne({ tradingAccountNumber });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    // Update open trades prices
    await updateOpenTradesPrices(account.userId, accountType, tradingAccountNumber || account.tradingAccountNumber);

    // Fetch updated account data
    const updatedAccount = accountId 
      ? await Model.findById(accountId)
      : await Model.findOne({ tradingAccountNumber: tradingAccountNumber || account.tradingAccountNumber });

    return res.status(200).json({
      success: true,
      equity: updatedAccount.equity,
      balance: updatedAccount.balance,
      message: 'Trade prices updated successfully'
    });
  } catch (error) {
    console.error('Error updating trade prices:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating trade prices'
    });
  }
};

module.exports = {
  getAccountTrades,
  startAutomatedTrading,
  stopAutomatedTrading,
  updateTradePrices,
  processAutomatedTradingCycle,
  generateAutomatedTrades,
  closeTradesWithProfit,
  updateAccountBalance,
  updateOpenTradesPrices
};

