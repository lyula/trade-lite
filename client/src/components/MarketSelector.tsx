import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MarketSelectorProps {
  selectedPair: string;
  onSelectPair: (pair: string) => void;
}

const POPULAR_PAIRS = [
  { pair: "BTC/USD", name: "Bitcoin" },
  { pair: "ETH/USD", name: "Ethereum" },
  { pair: "BNB/USD", name: "Binance Coin" },
  { pair: "SOL/USD", name: "Solana" },
  { pair: "XRP/USD", name: "Ripple" },
  { pair: "ADA/USD", name: "Cardano" },
];

export const MarketSelector = ({ selectedPair, onSelectPair }: MarketSelectorProps) => {
  return (
    <Card className="p-4 bg-card">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-foreground">Markets</h2>
        <p className="text-sm text-muted-foreground">Select a trading pair</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {POPULAR_PAIRS.map(({ pair, name }) => (
          <Button
            key={pair}
            variant={selectedPair === pair ? "default" : "outline"}
            onClick={() => onSelectPair(pair)}
            className="flex flex-col h-auto py-3"
          >
            <span className="font-bold">{pair.split("/")[0]}</span>
            <span className="text-xs text-muted-foreground">{name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
