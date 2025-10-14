import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Markets = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
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
  }, []);

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : "flex flex-col h-[calc(100vh-6rem)]"}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Markets</h1>
          <p className="text-muted-foreground">Live market data and charts</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="ml-4"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 rounded-lg border bg-card overflow-hidden min-h-0">
        <div id="tradingview_chart" ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Markets;
