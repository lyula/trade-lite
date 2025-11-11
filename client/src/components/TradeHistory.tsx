import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, RefreshCw } from "lucide-react";

interface Trade {
  _id: string;
  pair: string;
  type: "buy" | "sell";
  amount: number;
  entryPrice: number;
  currentPrice?: number;
  exitPrice?: number;
  openedAt: string;
  closedAt?: string;
  status: "open" | "closed";
  profit?: number;
  profitPercentage?: number;
  unrealizedProfit?: number;
  unrealizedProfitPercentage?: number;
}

interface TradeHistoryProps {
  accountType?: "demo" | "live";
  tradingAccountNumber?: string;
  isConnected?: boolean;
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const TradeHistory = ({ accountType, tradingAccountNumber, isConnected }: TradeHistoryProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [equity, setEquity] = useState<number>(0);

  const fetchTrades = async () => {
    if (!accountType || !tradingAccountNumber || !isConnected) {
      setTrades([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/automated-trading/trades?accountType=${accountType}&tradingAccountNumber=${tradingAccountNumber}`
      );
      const data = await response.json();
      
      if (data.success) {
        setTrades(data.trades || []);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrices = async () => {
    if (!accountType || !tradingAccountNumber || !isConnected) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/automated-trading/update-prices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountType,
            tradingAccountNumber,
          }),
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setEquity(data.equity || 0);
        // Fetch updated trades to get new unrealized P&L
        fetchTrades();
      }
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  useEffect(() => {
    fetchTrades();
    
    // Refresh trades every 30 seconds
    const tradesInterval = setInterval(fetchTrades, 30000);
    
    // Update prices more frequently for realistic fluctuations
    // Every 5 seconds for demo, every 30 seconds for live
    const pricesInterval = setInterval(
      updatePrices,
      accountType === 'demo' ? 5000 : 30000
    );
    
    return () => {
      clearInterval(tradesInterval);
      clearInterval(pricesInterval);
    };
  }, [accountType, tradingAccountNumber, isConnected]);

  const openTrades = trades.filter((t) => t.status === "open");
  const closedTrades = trades.filter((t) => t.status === "closed");

  const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
  const totalUnrealizedProfit = openTrades.reduce((sum, trade) => sum + (trade.unrealizedProfit || 0), 0);

  return (
    <Card className="p-4 bg-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Trade History</h2>
          <p className="text-sm text-muted-foreground">
            {openTrades.length} open • {closedTrades.length} closed
          </p>
        </div>
        <div className="flex items-center gap-3">
          {openTrades.length > 0 && (
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Unrealized P/L</div>
              <div
                className={`text-sm font-semibold ${
                  totalUnrealizedProfit >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {totalUnrealizedProfit >= 0 ? "+" : ""}${totalUnrealizedProfit.toFixed(2)}
              </div>
            </div>
          )}
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Realized P/L</div>
            <div
              className={`text-lg font-bold ${
                totalProfit >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalProfit >= 0 ? "+" : ""}${totalProfit.toFixed(2)}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTrades}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading && trades.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading trades...</p>
          </div>
        ) : openTrades.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Open Positions</h3>
            <div className="space-y-2">
              {openTrades.map((trade) => (
                <div
                  key={trade._id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={trade.type === "buy" ? "default" : "destructive"}
                        className={trade.type === "buy" ? "bg-green-600" : "bg-red-600"}
                      >
                        {trade.type.toUpperCase()}
                      </Badge>
                      <span className="font-semibold text-foreground">{trade.pair}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Amount: ${trade.amount.toFixed(2)} • Entry: $
                      {trade.entryPrice.toFixed(2)}
                      {trade.currentPrice && (
                        <> • Current: ${trade.currentPrice.toFixed(2)}</>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(trade.openedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="ml-2 text-right">
                    {trade.unrealizedProfit !== undefined && trade.unrealizedProfit !== null ? (
                      <>
                        <div
                          className={`text-lg font-bold ${
                            trade.unrealizedProfit >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {trade.unrealizedProfit >= 0 ? "+" : ""}${trade.unrealizedProfit.toFixed(2)}
                        </div>
                        {trade.unrealizedProfitPercentage !== undefined && (
                          <div
                            className={`text-xs ${
                              trade.unrealizedProfit >= 0 ? "text-green-500/70" : "text-red-500/70"
                            }`}
                          >
                            {trade.unrealizedProfit >= 0 ? "+" : ""}{trade.unrealizedProfitPercentage.toFixed(2)}%
                          </div>
                        )}
                      </>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {closedTrades.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Closed Positions</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {closedTrades.map((trade) => (
                <div
                  key={trade._id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={trade.type === "buy" ? "default" : "destructive"}
                        className={trade.type === "buy" ? "bg-green-600" : "bg-red-600"}
                      >
                        {trade.type.toUpperCase()}
                      </Badge>
                      <span className="font-semibold text-foreground">{trade.pair}</span>
                      {trade.profitPercentage && (
                        <Badge variant="outline" className="text-xs">
                          +{trade.profitPercentage.toFixed(2)}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Amount: ${trade.amount.toFixed(2)} • Entry: $
                      {trade.entryPrice.toFixed(2)} • Exit: ${trade.exitPrice?.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(trade.openedAt).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ml-2 ${
                      (trade.profit || 0) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {(trade.profit || 0) >= 0 ? "+" : ""}${trade.profit?.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {!loading && trades.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No trades yet</p>
            <p className="text-sm mt-1">
              {isConnected 
                ? "Our bot will start trading soon" 
                : "Connect an account to start automated trading"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
