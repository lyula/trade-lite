import { useState, useEffect } from "react";
import { TradingChart } from "@/components/TradingChart";
import { TradeControls } from "@/components/TradeControls";
import { TradeHistory } from "@/components/TradeHistory";
import { MarketSelector } from "@/components/MarketSelector";

export interface Trade {
  id: string;
  pair: string;
  type: "buy" | "sell";
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  timestamp: number;
  status: "open" | "closed";
  profit?: number;
}

const Markets = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USD");
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPrice, setCurrentPrice] = useState(50000);

  const handleTrade = (type: "buy" | "sell", amount: number) => {
    const newTrade: Trade = {
      id: Date.now().toString(),
      pair: selectedPair,
      type,
      amount,
      entryPrice: currentPrice,
      timestamp: Date.now(),
      status: "open",
    };
    setTrades([newTrade, ...trades]);
  };

  const handleCloseTrade = (tradeId: string) => {
    setTrades(
      trades.map((trade) => {
        if (trade.id === tradeId && trade.status === "open") {
          const profit =
            trade.type === "buy"
              ? (currentPrice - trade.entryPrice) * (trade.amount / trade.entryPrice)
              : (trade.entryPrice - currentPrice) * (trade.amount / trade.entryPrice);
          return {
            ...trade,
            status: "closed" as const,
            exitPrice: currentPrice,
            profit: Number(profit.toFixed(2)),
          };
        }
        return trade;
      })
    );
  };

  return (
    <div className="min-h-screen bg-trading-dark">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Simulated Trading Market</h1>
          <p className="text-muted-foreground">Practice trading with real-time simulated crypto markets</p>
        </div>

        <MarketSelector selectedPair={selectedPair} onSelectPair={setSelectedPair} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            <TradingChart pair={selectedPair} onPriceUpdate={setCurrentPrice} />
          </div>
          <div>
            <TradeControls
              currentPrice={currentPrice}
              selectedPair={selectedPair}
              onTrade={handleTrade}
            />
          </div>
        </div>

        <div className="mt-4">
          <TradeHistory trades={trades} onCloseTrade={handleCloseTrade} />
        </div>
      </div>
    </div>
  );
};

export default Markets;
