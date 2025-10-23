import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TransferFunds: React.FC = () => {
  const navigate = useNavigate();
  const [fromAccount, setFromAccount] = useState('W-0961795-002 Wallet (KES 0.0000)');
  const [toAccount, setToAccount] = useState('W-0961795-003 Wallet (KES 0.0000)');
  const [transferAmount, setTransferAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleContinue = () => {
    // Handle transfer logic here
    navigate('/dashboard/transfers');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          Move Funds Between Accounts
        </h1>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">
                From Account
              </label>
              <select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="W-0961795-002 Wallet (KES 0.0000)">
                  W-0961795-002 Wallet (KES 0.0000)
                </option>
                {/* Add more accounts as needed */}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">
                To Account
              </label>
              <select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="W-0961795-003 Wallet (KES 0.0000)">
                  W-0961795-003 Wallet (KES 0.0000)
                </option>
                {/* Add more accounts as needed */}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">
                Transfer Amount
              </label>
              <div className="flex gap-2">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border rounded px-3 py-2 text-lg"
                >
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setTransferAmount(0);
                  }}
                  placeholder={`0.00`}
                  className="border rounded px-3 py-2 text-lg w-full"
                />
              </div>
            </div>
            <Button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded w-full mt-4"
              onClick={handleContinue}
            >
              Initiate Transfer
            </Button>
            <span className="block text-sm text-muted-foreground text-center mt-4">
              Ensure the accounts selected are valid and the transfer amount is correct.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferFunds;