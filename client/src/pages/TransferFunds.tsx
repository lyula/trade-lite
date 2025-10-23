import React, { useState } from 'react';
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

  const handleContinue = () => {
    // Handle transfer logic here
    navigate('/dashboard/transfers');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transfer Funds</h1>

      <Card>
        <CardHeader>
          <CardTitle>Move Funds Between Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">From Account</label>
              <Select>
                <option value="">Select From Account</option>
                {/* Add account options dynamically */}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium">To Account</label>
              <Select>
                <option value="">Select To Account</option>
                {/* Add account options dynamically */}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium">Transfer Amount</label>
              <div className="flex items-center gap-2">
                <Select>
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
                  {/* Add currency options dynamically */}
                </Select>
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