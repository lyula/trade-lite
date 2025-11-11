// Helper to get currency from selected account/wallet
function getSelectedCurrency(selectedId, liveAccounts, demoAccounts, wallets) {
  const liveAcc = liveAccounts.find(a => a.tradingAccountNumber === selectedId);
  if (liveAcc) return liveAcc.currency;
  const demoAcc = demoAccounts.find(a => a.tradingAccountNumber === selectedId);
  if (demoAcc) return demoAcc.currency;
  const wallet = wallets.find(w => w.walletId === selectedId);
  if (wallet) return wallet.currency;
  return null;
}
import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const TransferFunds: React.FC = () => {
  const navigate = useNavigate();
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [liveAccounts, setLiveAccounts] = useState([]);
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useUserContext();

  useEffect(() => {
    async function fetchAccounts() {
      if (!user || !user.id) return;
      try {
        const resLive = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/live-accounts?userId=${user.id}`);
        const dataLive = await resLive.json();
        setLiveAccounts(dataLive.success ? dataLive.accounts : []);
      } catch {
        setLiveAccounts([]);
      }
      try {
        const resDemo = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/demo-accounts?userId=${user.id}`);
        const dataDemo = await resDemo.json();
        setDemoAccounts(dataDemo.success ? dataDemo.accounts : []);
      } catch {
        setDemoAccounts([]);
      }
      try {
        const resWallet = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wallets?userId=${user.id}`);
        const dataWallet = await resWallet.json();
        setWallets(dataWallet.success ? dataWallet.wallets : []);
      } catch {
        setWallets([]);
      }
    }
    fetchAccounts();
  }, [user]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fromAccount || !toAccount) {
      setError('Please select both source and destination accounts');
      return;
    }

    const amount = customAmount ? parseFloat(customAmount) : transferAmount;
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Get currency from selected account
    const selectedCurrency = getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets);
    if (!selectedCurrency) {
      setError('Could not determine account currency');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fromId: fromAccount,
          toId: toAccount,
          amount,
          currency: selectedCurrency
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || 'Transfer successful!');
        setFromAccount('');
        setToAccount('');
        setCustomAmount('');
        setTransferAmount(0);
        
        // Refresh accounts
        const resLive = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/live-accounts?userId=${user.id}`);
        const dataLive = await resLive.json();
        setLiveAccounts(dataLive.success ? dataLive.accounts : []);

        const resDemo = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/demo-accounts?userId=${user.id}`);
        const dataDemo = await resDemo.json();
        setDemoAccounts(dataDemo.success ? dataDemo.accounts : []);

        const resWallet = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wallets?userId=${user.id}`);
        const dataWallet = await resWallet.json();
        setWallets(dataWallet.success ? dataWallet.wallets : []);

        setTimeout(() => {
          navigate('/dashboard/transfers');
        }, 2000);
      } else {
        setError(data.error || 'Transfer failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transfer Funds</h1>

      <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        Note: You can transfer funds between wallets, live accounts, and demo accounts of the same currency. 
        Trading accounts can only transfer profits (withdrawable balance), not deposits.
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-800 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 text-green-800 rounded">
          {success}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Move Funds Between Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleTransfer}>
            <div>
              <label className="block text-sm font-medium">From Account</label>
              <select
                value={fromAccount}
                onChange={e => setFromAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="">Select From Account</option>
                {(fromAccount === '' ?
                  [
                    ...liveAccounts.map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...demoAccounts.map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Demo: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...wallets.map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance?.toFixed(2)}`}
                      </option>
                    ))
                  ]
                  :
                  [
                    ...liveAccounts.filter(acc => acc.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...demoAccounts.filter(acc => acc.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Demo: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...wallets.filter(wallet => wallet.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance?.toFixed(2)}`}
                      </option>
                    ))
                  ]
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">To Account</label>
              <select
                value={toAccount}
                onChange={e => setToAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="">Select To Account</option>
                {(fromAccount === '' ?
                  [
                    ...liveAccounts.map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...demoAccounts.map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Demo: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...wallets.map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance?.toFixed(2)}`}
                      </option>
                    ))
                  ]
                  :
                  [
                    ...liveAccounts.filter(acc => acc.tradingAccountNumber !== fromAccount && acc.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...demoAccounts.filter(acc => acc.tradingAccountNumber !== fromAccount && acc.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Demo: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance?.toFixed(2)}`}
                      </option>
                    )),
                    ...wallets.filter(wallet => wallet.walletId !== fromAccount && wallet.currency === getSelectedCurrency(fromAccount, liveAccounts, demoAccounts, wallets)).map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance?.toFixed(2)}`}
                      </option>
                    ))
                  ]
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Transfer Amount</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={e => {
                    setCustomAmount(e.target.value);
                    setTransferAmount(0);
                  }}
                  placeholder="Enter amount"
                  className="border rounded px-3 py-2 text-lg w-full"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? 'Processing...' : 'Initiate Transfer'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferFunds;