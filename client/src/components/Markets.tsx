import { Card } from "@/components/ui/card";
import { Bitcoin, TrendingUp, BarChart3, Coins, X } from "lucide-react";
import { useState } from "react";

const Markets = () => {
  const [expanded, setExpanded] = useState(false);

  const markets = [
    {
      icon: Bitcoin,
      title: "Cryptocurrency",
      description: "Trade BTC, ETH, and 100+ digital assets with low fees and instant execution.",
      features: ["Spot Trading", "Perpetual Futures", "Staking Rewards"],
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: BarChart3,
      title: "Stocks & Indices",
      description: "Access global equity markets including US, EU, and emerging markets.",
      features: ["0% Commission", "Real-time Data", "Fractional Shares"],
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Coins,
      title: "Commodities",
      description: "Trade gold, silver, oil, and agricultural products with leverage.",
      features: ["CFD Trading", "Hedging Tools", "Expert Analysis"],
      gradient: "from-accent-glow to-primary",
    },
    {
      icon: TrendingUp,
      title: "Forex Trading",
      description: "Trade major and exotic currency pairs with tight spreads 24/5.",
      features: ["60+ Pairs", "Leverage up to 1:500", "Micro Lots"],
      gradient: "from-primary-glow to-accent",
    },
  ];

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <button
          className="absolute top-4 right-4 bg-card rounded-full p-2 shadow-lg hover:bg-primary/10 transition z-10"
          onClick={() => setExpanded(false)}
          aria-label="Collapse"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>
        <div className="w-full h-full">
          <iframe
            src="https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT&theme=dark"
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <section id="markets" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trade Your <span className="bg-gradient-primary bg-clip-text text-transparent">Preferred Markets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Diversify your portfolio across multiple asset classes with our comprehensive trading platform
          </p>
        </div>
        <button
          className="absolute top-6 right-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition"
          onClick={() => setExpanded(true)}
        >
          Expand Markets
        </button>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${market.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                <market.icon className="w-full h-full text-background" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{market.title}</h3>
              <p className="text-muted-foreground mb-4">{market.description}</p>
              <ul className="space-y-2">
                {market.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-glow"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Markets;
