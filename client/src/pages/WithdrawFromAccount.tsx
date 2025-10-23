import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const WithdrawFromAccount = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Withdrawal - Mobile Payment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Withdraw from Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Select an Account</label>
              <select
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="">Select an Account</option>
                <option value="W-0961795-002 Wallet (KES 0.0000)">W-0961795-002 Wallet (KES 0.0000)</option>
                <option value="W-0961795-003 Wallet (USD 0.0000)">W-0961795-003 Wallet (USD 0.0000)</option>
                {/* Add more accounts dynamically */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Withdrawal Amount (USD)</label>
              <Input type="number" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium">Converted Amount</label>
              <div className="flex items-center gap-2">
                <select
                  className="border rounded px-3 py-2 text-lg"
                >
                  <option value="KES">KES</option>
                  {/* Add currency options dynamically */}
                </select>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile number to send money</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="+254"
                  readOnly
                  className="border rounded px-3 py-2 text-lg w-20 bg-gray-100"
                />
                <input
                  type="tel"
                  placeholder="7xxxxxxxx"
                  className="border rounded px-3 py-2 text-lg w-full"
                  pattern="[7-9][0-9]{8}"
                  maxLength={9}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Payment Provider</label>
              <select
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="">Select a Provider</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="M-pesa">M-pesa</option>
              </select>
            </div>

            <Button type="submit" className="w-full mt-4">
              Submit Withdrawal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawFromAccount;