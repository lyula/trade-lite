import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

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
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Deposit to Account</h1>

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
                <option value="">Select an Account</option>
                <option value="W-0961795-002 Wallet (KES 0.0000)">W-0961795-002 Wallet (KES 0.0000)</option>
                <option value="W-0961795-003 Wallet (USD 0.0000)">W-0961795-003 Wallet (USD 0.0000)</option>
                {/* Add more accounts dynamically */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Deposit Amount</label>
              <div className="flex gap-4">
                {[50000, 70000, 100000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={depositAmount === amount ? "default" : "outline"}
                    className="min-w-[120px]"
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

            <Button type="button" className="bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded w-full mt-4" onClick={handleContinue}>
              Initiate Deposit
            </Button>
            <span className="block text-sm text-muted-foreground text-center mt-4">
              TradeLite does not accept payments from numbers or cards not registered under your name. I confirm that my account name with TradeLite matches the name on my card or mobile number.
            </span>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositToAccount;
