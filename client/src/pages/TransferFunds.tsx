// Helper to get currency from selected account/wallet
function getSelectedCurrency(selectedId, liveAccounts, wallets) {
  const acc = liveAccounts.find(a => a.tradingAccountNumber === selectedId);
  if (acc) return acc.currency;
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
  const [wallets, setWallets] = useState([]);
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
        const resWallet = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wallets?userId=${user.id}`);
        const dataWallet = await resWallet.json();
        setWallets(dataWallet.success ? dataWallet.wallets : []);
      } catch {
        setWallets([]);
      }
    }
    fetchAccounts();
  }, [user]);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transfer Funds</h1>

      <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        Note: You can only transfer funds between wallets or accounts of the same currency.
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Move Funds Between Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
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
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance}`}
                      </option>
                    )),
                    ...wallets.map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance}`}
                      </option>
                    ))
                  ]
                  :
                  [
                    ...liveAccounts.filter(acc => acc.currency === getSelectedCurrency(fromAccount, liveAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance}`}
                      </option>
                    )),
                    ...wallets.filter(wallet => wallet.currency === getSelectedCurrency(fromAccount, liveAccounts, wallets)).map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance}`}
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
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance}`}
                      </option>
                    )),
                    ...wallets.map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance}`}
                      </option>
                    ))
                  ]
                  :
                  [
                    ...liveAccounts.filter(acc => acc.tradingAccountNumber !== fromAccount && acc.currency === getSelectedCurrency(fromAccount, liveAccounts, wallets)).map(acc => (
                      <option key={acc._id} value={acc.tradingAccountNumber}>
                        {`Live: ${acc.tradingAccountNumber} (${acc.currency}) - Balance: ${acc.balance}`}
                      </option>
                    )),
                    ...wallets.filter(wallet => wallet.walletId !== fromAccount && wallet.currency === getSelectedCurrency(fromAccount, liveAccounts, wallets)).map(wallet => (
                      <option key={wallet._id} value={wallet.walletId}>
                        {`Wallet: ${wallet.walletId} (${wallet.currency}) - Balance: ${wallet.balance}`}
                      </option>
                    ))
                  ]
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Transfer Amount</label>
              <div className="flex items-center gap-2">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="border rounded px-3 py-2 text-lg"
                >
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
                </select>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Initiate Transfer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferFunds;