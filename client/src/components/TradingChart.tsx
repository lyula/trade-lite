import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface TradingChartProps {
  pair: string;
  onPriceUpdate: (price: number) => void;
}

export const TradingChart = ({ pair, onPriceUpdate }: TradingChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate price updates for demo
    const interval = setInterval(() => {
      const basePrice = pair.includes("BTC") ? 50000 : pair.includes("ETH") ? 3000 : 100;
      const randomChange = (Math.random() - 0.5) * 1000;
      const newPrice = basePrice + randomChange;
      onPriceUpdate(newPrice);
    }, 3000);

    return () => clearInterval(interval);
  }, [pair, onPriceUpdate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        const symbol = pair.replace("/", "");
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`,
          interval: "5",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#1a1a1a",
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: "tradingview_widget",
          height: "100%",
          width: "100%",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [pair]);

  return (
    <Card className="p-4 h-[600px] lg:h-[700px] bg-card flex flex-col">
      <div className="mb-3 flex-shrink-0">
        <h2 className="text-lg font-semibold text-foreground">{pair} Chart</h2>
        <p className="text-sm text-muted-foreground">Real-time price data (simulated)</p>
      </div>
      <div id="tradingview_widget" ref={containerRef} className="w-full flex-1 min-h-0" />
    </Card>
  );
};
