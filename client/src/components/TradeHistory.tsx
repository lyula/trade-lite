import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Trade } from "@/pages/Automation";

interface TradeHistoryProps {
  trades: Trade[];
  onCloseTrade: (tradeId: string) => void;
}

export const TradeHistory = ({ trades, onCloseTrade }: TradeHistoryProps) => {
  const openTrades = trades.filter((t) => t.status === "open");
  const closedTrades = trades.filter((t) => t.status === "closed");

  const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0);

  return (
    <Card className="p-4 bg-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Trade History</h2>
          <p className="text-sm text-muted-foreground">
            {openTrades.length} open • {closedTrades.length} closed
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Total P/L</div>
          <div
            className={`text-lg font-bold ${
              totalProfit >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalProfit >= 0 ? "+" : ""}${totalProfit.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {openTrades.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Open Positions</h3>
            <div className="space-y-2">
              {openTrades.map((trade) => (
                <div
                  key={trade.id}
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
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCloseTrade(trade.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                    Close
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {closedTrades.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Closed Positions</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {closedTrades.map((trade) => (
                <div
                  key={trade.id}
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
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Amount: ${trade.amount.toFixed(2)} • Entry: $
                      {trade.entryPrice.toFixed(2)} • Exit: ${trade.exitPrice?.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleString()}
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
        )}

        {trades.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No trades yet</p>
            <p className="text-sm mt-1">Start trading to see your history</p>
          </div>
        )}
      </div>
    </Card>
  );
};
