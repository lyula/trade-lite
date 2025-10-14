import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DepositToAccount = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("W-0961795-002 Wallet (KES 0.0000)");
  const [depositAmount, setDepositAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [phone, setPhone] = useState("");

  const handlePreset = (amount: number) => {
    setDepositAmount(amount);
    setCustomAmount("");
  };

  const handleContinue = () => {
    // Handle deposit logic here
    navigate("/dashboard/deposits");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Fund Your Account Easily and Securely</h1>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
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
              <label className="block text-base font-semibold mb-2 text-foreground">Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg mb-6"
              >
                <option value="USD">USD</option>
                <option value="KES">KES</option>
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
                    {currency} {amount.toLocaleString()}
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
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
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
                  placeholder={`0.00`}
                  className="border rounded px-3 py-2 text-lg w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+254xxxxxxxxx"
                className="w-full border rounded px-3 py-2 text-lg"
                pattern="\+254[0-9]{9}"
                maxLength={13}
              />
            </div>
            <Button type="button" className="bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded w-full mt-4" onClick={handleContinue}>
              Initiate Deposit
            </Button>
            <span className="block text-sm text-muted-foreground text-center mt-4">
              TradeLite does not accept payments from numbers or cards not registered under your name. I confirm that my account name with TradeLite matches the name on my card or mobile number.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositToAccount;
