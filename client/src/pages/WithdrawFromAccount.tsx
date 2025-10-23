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
              <Select>
                <option value="">Select an Account</option>
                {/* Add account options dynamically */}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium">Withdrawal Amount</label>
              <Input type="number" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium">Converted Amount</label>
              <div className="flex items-center gap-2">
                <Select>
                  <option value="KES">KES</option>
                  {/* Add currency options dynamically */}
                </Select>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile number to send money</label>
              <Input type="text" placeholder="254703425592" />
            </div>

            <div>
              <label className="block text-sm font-medium">Payment Provider</label>
              <Select>
                <option value="">Select a Provider</option>
                {/* Add provider options dynamically */}
              </Select>
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