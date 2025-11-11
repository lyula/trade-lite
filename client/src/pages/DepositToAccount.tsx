import { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const DepositToAccount = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [depositAmount, setDepositAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [phone, setPhone] = useState("");
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useUserContext();
  useEffect(() => {
    async function fetchWallets() {
      if (!user || !user.id) {
        setWallets([]);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wallets?userId=${user.id}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.wallets)) {
          setWallets(data.wallets);
        } else {
          setWallets([]);
        }
      } catch {
        setWallets([]);
      }
    }
    fetchWallets();
  }, [user]);

  const handlePreset = (amount: number) => {
    setDepositAmount(amount);
    setCustomAmount("");
  };

  const handleContinue = async () => {
    setError('');
    setSuccess('');

    if (!selectedAccount) {
      setError('Please select a wallet account');
      return;
    }

    const amount = customAmount ? parseFloat(customAmount) : depositAmount;
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!phone || phone.length !== 9) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transfer/external-deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          walletId: selectedAccount,
          amount,
          currency,
          phone: `+254${phone}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || 'Deposit initiated successfully!');
        setSelectedAccount('');
        setCustomAmount('');
        setDepositAmount(50000);
        setPhone('');

        setTimeout(() => {
          navigate("/dashboard/deposits");
        }, 2000);
      } else {
        setError(data.error || 'Deposit failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Deposit to Account</h1>

      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-800 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border-l-4 border-green-400 text-green-800 rounded">
          {success}
        </div>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Fund Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Select an Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="">Select a Wallet Account</option>
                {wallets.map(wallet => (
                  <option key={wallet._id} value={wallet.walletId}>
                    {wallet.walletId} Wallet ({wallet.currency} {wallet.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Deposit Amount</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[50000, 70000, 100000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={depositAmount === amount ? "default" : "outline"}
                    className="min-w-[120px] rounded-sm"
                    onClick={() => setDepositAmount(amount)}
                  >
                    {currency} {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Add Amount</label>
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
                    setDepositAmount(0);
                  }}
                  placeholder={`0.00`}
                  className="border rounded px-3 py-2 text-lg w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="+254"
                  readOnly
                  className="border rounded px-3 py-2 text-lg w-20 bg-gray-100"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="7xxxxxxxx"
                  className="border rounded px-3 py-2 text-lg w-full"
                  pattern="[7-9][0-9]{8}"
                  maxLength={9}
                />
              </div>
            </div>

            <Button type="button" className="bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded w-full mt-4" onClick={handleContinue} disabled={loading}>
              {loading ? 'Processing...' : 'Initiate Deposit'}
            </Button>
            <span className="block text-sm text-muted-foreground text-center mt-4">
              EquityVault does not accept payments from numbers or cards not registered under your name. I confirm that my account name with EquityVault matches the name on my card or mobile number.
            </span>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositToAccount;
