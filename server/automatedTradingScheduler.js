const cron = require('node-cron');
const AutomatedTrade = require('./models/AutomatedTrade');
const LiveAccount = require('./models/LiveAccount');
const DemoAccount = require('./models/DemoAccount');
const {
  generateAutomatedTrades,
  closeTradesWithProfit,
  updateAccountBalance
} = require('./controllers/automatedTradingController');

// Process demo accounts every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running demo trading cycle...');
  try {
    const demoAccounts = await DemoAccount.find({ 
      balance: { $gt: 0 },
      isAutomatedTradingActive: true // Only process accounts with active trading
    });
    
    for (const account of demoAccounts) {
      // Check if account has any open trades
      const openTrades = await AutomatedTrade.find({
        accountId: account._id,
        accountType: 'demo',
        status: 'open'
      });

      if (openTrades.length > 0) {
        // Close trades gradually - only 1-2 trades per cycle for slow profit accumulation
        const tradesToClose = Math.min(2, Math.ceil(openTrades.length * 0.3)); // Close ~30% but max 2
        
        const { totalProfit } = await closeTradesWithProfit(
          'demo',
          account.tradingAccountNumber,
          tradesToClose // Gradually close trades
        );

        // Update account balance
        if (totalProfit > 0) {
          await updateAccountBalance('demo', account._id, totalProfit);
        }
      }

      // Refresh account data
      const updatedAccount = await DemoAccount.findById(account._id);

      // Generate new trades only if daily profit target not reached
      if (updatedAccount.dailyProfitEarned < updatedAccount.dailyProfitTarget) {
        await generateAutomatedTrades(
          updatedAccount.userId,
          updatedAccount._id,
          'demo',
          updatedAccount.tradingAccountNumber,
          updatedAccount.balance
        );
      }

      // Update last cycle time
      updatedAccount.lastTradingCycleAt = new Date();
      await updatedAccount.save();
    }
    
    console.log(`Processed ${demoAccounts.length} demo accounts`);
  } catch (error) {
    console.error('Error in demo trading cycle:', error);
  }
});

// Process live accounts every 2 hours for gradual profit accumulation
cron.schedule('0 */2 * * *', async () => {
  console.log('Running live trading cycle...');
  try {
    const liveAccounts = await LiveAccount.find({ 
      balance: { $gt: 0 },
      isAutomatedTradingActive: true // Only process accounts with active trading
    });
    
    for (const account of liveAccounts) {
      // Check if account has any open trades
      const openTrades = await AutomatedTrade.find({
        accountId: account._id,
        accountType: 'live',
        status: 'open'
      });

      if (openTrades.length > 0) {
        // Close trades gradually - only 1 trade per cycle for slow, realistic profit growth
        const tradesToClose = 1; // Close only 1 trade at a time for live accounts
        
        const { totalProfit } = await closeTradesWithProfit(
          'live',
          account.tradingAccountNumber,
          tradesToClose // Gradually close trades
        );

        // Update account balance
        if (totalProfit > 0) {
          await updateAccountBalance('live', account._id, totalProfit);
        }
      }

      // Refresh account data
      const updatedAccount = await LiveAccount.findById(account._id);

      // Generate new trades only if daily profit target not reached
      if (updatedAccount.dailyProfitEarned < updatedAccount.dailyProfitTarget) {
        await generateAutomatedTrades(
          updatedAccount.userId,
          updatedAccount._id,
          'live',
          updatedAccount.tradingAccountNumber,
          updatedAccount.balance
        );
      }

      // Update last cycle time
      updatedAccount.lastTradingCycleAt = new Date();
      await updatedAccount.save();
    }
    
    console.log(`Processed ${liveAccounts.length} live accounts`);
  } catch (error) {
    console.error('Error in live trading cycle:', error);
  }
});

console.log('Automated trading scheduler started');
console.log('- Demo accounts: every 5 minutes (closes 1-2 trades per cycle)');
console.log('- Live accounts: every 2 hours (closes 1 trade per cycle)');

module.exports = { /* Export if needed for testing */ };
