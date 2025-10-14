import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DepositToAccount = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("W-0961795-002 Wallet (KES 0.0000)");
  const [depositAmount, setDepositAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("KES");

  const handlePreset = (amount: number) => {
    setDepositAmount(amount);
    setCustomAmount("");
  };

  const handleContinue = () => {
    // Handle deposit logic here
    navigate("/dashboard/deposits");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-foreground">Fund Your Account Easily and Securely</h1>
        <Card className="p-8">
          <form className="space-y-8">
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Select an Account</label>
              <select
                value={selectedAccount}
                onChange={e => setSelectedAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="W-0961795-002 Wallet (KES 0.0000)">W-0961795-002 Wallet (KES 0.0000)</option>
                {/* Add more accounts as needed */}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Deposit Amount</label>
              <div className="flex gap-4 mb-2">
                {[50000, 70000, 100000].map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={depositAmount === amount ? "default" : "outline"}
                    className="min-w-[120px]"
                    onClick={() => handlePreset(amount)}
                  >
                    KES {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Add Amount</label>
              <div className="flex gap-2">
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="border rounded px-3 py-2 text-lg"
                >
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customAmount}
                  onChange={e => {
                    setCustomAmount(e.target.value);
                    setDepositAmount(0);
                  }}
                  placeholder="0.00"
                  className="border rounded px-3 py-2 text-lg w-full"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm text-muted-foreground mb-2">
                TradeLite does not accept payments from numbers or cards not registered under your name. I confirm that my account name with TradeLite matches the name on my card or mobile number.
              </span>
            </div>
            <Button type="button" className="w-full bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded" onClick={handleContinue}>
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DepositToAccount;
