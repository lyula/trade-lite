import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradeControlsProps {
  currentPrice: number;
  selectedPair: string;
  onTrade: (type: "buy" | "sell", amount: number) => void;
}

export const TradeControls = ({ currentPrice, selectedPair, onTrade }: TradeControlsProps) => {
  const [amount, setAmount] = useState("100");

  const handleTrade = (type: "buy" | "sell") => {
    const tradeAmount = parseFloat(amount);
    if (tradeAmount > 0) {
      onTrade(type, tradeAmount);
      // Keep the amount for next trade
    }
  };

  return (
    <Card className="p-4 bg-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Trade Controls</h2>
        <p className="text-sm text-muted-foreground">Execute simulated trades</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Current Price</Label>
          <div className="text-2xl font-bold text-foreground">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-muted-foreground">{selectedPair}</div>
        </div>

        <div>
          <Label htmlFor="amount" className="text-sm font-medium text-foreground">
            Trade Amount ($)
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1"
            min="1"
            step="1"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleTrade("buy")}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Buy
          </Button>
          <Button
            onClick={() => handleTrade("sell")}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <TrendingDown className="mr-2 h-4 w-4" />
            Sell
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted rounded">
          <p className="font-semibold mb-1">Simulated Trading</p>
          <p>This is a simulated environment for testing trading strategies. No real money is involved.</p>
        </div>
      </div>
    </Card>
  );
};
