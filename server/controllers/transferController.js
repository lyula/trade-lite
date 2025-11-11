const LiveAccount = require('../models/LiveAccount');
const DemoAccount = require('../models/DemoAccount');
const Wallet = require('../models/Wallet');
const Deposit = require('../models/Deposit');

// Transfer funds between accounts/wallets and track deposits
exports.transferFunds = async (req, res) => {
  try {
    const { userId, fromId, toId, amount, currency } = req.body;

    if (!userId || !fromId || !toId || !amount || !currency) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }

    if (fromId === toId) {
      return res.status(400).json({ success: false, error: 'Cannot transfer to the same account' });
    }

    // Find source and destination accounts
    const { account: fromAccount, type: fromType } = await findAccount(fromId);
    const { account: toAccount, type: toType } = await findAccount(toId);

    if (!fromAccount) {
      return res.status(404).json({ success: false, error: 'Source account not found' });
    }

    if (!toAccount) {
      return res.status(404).json({ success: false, error: 'Destination account not found' });
    }

    // Verify currency match
    if (fromAccount.currency !== currency || toAccount.currency !== currency) {
      return res.status(400).json({ success: false, error: 'Currency mismatch' });
    }

    // Verify sufficient balance (can only transfer profits, not deposits)
    if (fromType === 'wallet') {
      // For wallets, can transfer full balance
      if (fromAccount.balance < amount) {
        return res.status(400).json({ success: false, error: 'Insufficient balance' });
      }
    } else {
      // For live/demo accounts, can only transfer withdrawable balance (profits)
      const withdrawableBalance = fromAccount.withdrawableBalance || 0;
      if (withdrawableBalance < amount) {
        return res.status(400).json({ 
          success: false, 
          error: `Insufficient withdrawable balance. You can only transfer profits ($${withdrawableBalance.toFixed(2)}), not deposits.` 
        });
      }
    }

    // Perform transfer
    fromAccount.balance -= amount;
    if (fromType !== 'wallet' && fromAccount.withdrawableBalance) {
      fromAccount.withdrawableBalance -= amount;
      fromAccount.totalProfits -= amount;
    }
    if (fromType !== 'wallet') {
      fromAccount.equity = fromAccount.balance;
    }

    toAccount.balance += amount;
    if (toType !== 'wallet') {
      toAccount.equity = toAccount.balance;
      // When transferring TO a trading account, it counts as a deposit
      if (!toAccount.totalDeposits) toAccount.totalDeposits = 0;
      toAccount.totalDeposits += amount;
    }

    // Save both accounts
    await fromAccount.save();
    await toAccount.save();

    // Create deposit record if transferring to a trading account
    if (toType !== 'wallet') {
      const deposit = new Deposit({
        userId,
        walletId: fromId, // Source of the transfer
        amount,
        currency
      });
      await deposit.save();
    }

    res.json({ 
      success: true, 
      message: `Successfully transferred ${currency} ${amount.toFixed(2)}`,
      fromBalance: fromAccount.balance,
      toBalance: toAccount.balance
    });
  } catch (err) {
    console.error('Transfer error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Helper function to find an account by ID (wallet, live, or demo)
async function findAccount(accountId) {
  // Try wallet first
  let account = await Wallet.findOne({ walletId: accountId });
  if (account) return { account, type: 'wallet' };

  // Try live account
  account = await LiveAccount.findOne({ tradingAccountNumber: accountId });
  if (account) return { account, type: 'live' };

  // Try demo account
  account = await DemoAccount.findOne({ tradingAccountNumber: accountId });
  if (account) return { account, type: 'demo' };

  return { account: null, type: null };
}

// Deposit funds from external source (e.g., M-Pesa) to wallet
exports.externalDeposit = async (req, res) => {
  try {
    const { userId, walletId, amount, currency, phone } = req.body;

    if (!userId || !walletId || !amount || !currency) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }

    // Find wallet
    const wallet = await Wallet.findOne({ walletId, userId });
    if (!wallet) {
      return res.status(404).json({ success: false, error: 'Wallet not found' });
    }

    if (wallet.currency !== currency) {
      return res.status(400).json({ success: false, error: 'Currency mismatch' });
    }

    // In a real system, you would:
    // 1. Initiate M-Pesa payment
    // 2. Wait for callback confirmation
    // 3. Then update balance
    // For now, we'll simulate successful payment

    wallet.balance += amount;
    await wallet.save();

    // Create deposit record
    const deposit = new Deposit({
      userId,
      walletId,
      amount,
      currency
    });
    await deposit.save();

    res.json({ 
      success: true, 
      message: `Successfully deposited ${currency} ${amount.toFixed(2)} to wallet`,
      balance: wallet.balance
    });
  } catch (err) {
    console.error('External deposit error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Initialize totalDeposits for existing accounts (migration helper)
exports.initializeDeposits = async (req, res) => {
  try {
    // Update all live accounts
    const liveAccounts = await LiveAccount.find({ totalDeposits: { $exists: false } });
    for (const account of liveAccounts) {
      // Set totalDeposits to current balance (assuming all existing balance is deposits)
      account.totalDeposits = account.balance || 0;
      account.withdrawableBalance = 0; // No profits yet
      account.totalProfits = 0;
      await account.save();
    }

    // Update all demo accounts
    const demoAccounts = await DemoAccount.find({ totalDeposits: { $exists: false } });
    for (const account of demoAccounts) {
      account.totalDeposits = account.balance || 0;
      account.withdrawableBalance = 0;
      account.totalProfits = 0;
      await account.save();
    }

    res.json({ 
      success: true, 
      message: `Initialized ${liveAccounts.length} live accounts and ${demoAccounts.length} demo accounts` 
    });
  } catch (err) {
    console.error('Initialize deposits error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
