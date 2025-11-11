import { useState, useEffect, useRef } from "react";
import { TradingChart } from "@/components/TradingChart";
import { TradeControls } from "@/components/TradeControls";
import { TradeHistory } from "@/components/TradeHistory";
import { MarketSelector } from "@/components/MarketSelector";
import { useUserContext } from "@/context/UserContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

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

const Automation = () => {
  const { user } = useUserContext();
  const [selectedPair, setSelectedPair] = useState("BTC/USD");
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPrice, setCurrentPrice] = useState(50000);
  const [accountType, setAccountType] = useState<"demo" | "live">("demo");
  const [connectedAccount, setConnectedAccount] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [viewingAccount, setViewingAccount] = useState<any>(null); // For viewing different account history
  
  // Ref for scrolling to trade history
  const tradeHistoryRef = useRef<HTMLDivElement>(null);

  // Fetch accounts and check for active automation on mount
  useEffect(() => {
    const fetchActiveAccount = async () => {
      if (!user || !user.id) return;

      try {
        // Fetch both live and demo accounts
        const [liveRes, demoRes] = await Promise.all([
          fetch(`${API_URL}/api/live-accounts?userId=${user.id}`),
          fetch(`${API_URL}/api/demo-accounts?userId=${user.id}`)
        ]);

        const liveData = await liveRes.json();
        const demoData = await demoRes.json();

        // Find account with active automation
        const liveAccounts = liveData.success && Array.isArray(liveData.accounts) ? liveData.accounts : [];
        const demoAccounts = demoData.success && Array.isArray(demoData.accounts) ? demoData.accounts : [];

        const activeAccount = 
          liveAccounts.find(acc => acc.isAutomatedTradingActive) ||
          demoAccounts.find(acc => acc.isAutomatedTradingActive);

        if (activeAccount) {
          // Determine account type
          const type = liveAccounts.includes(activeAccount) ? 'live' : 'demo';
          
          setConnectedAccount(activeAccount);
          setAccountType(type);
          setIsConnected(true);
          setViewingAccount(activeAccount);
        }
      } catch (error) {
        console.error('Error fetching active account:', error);
      }
    };

    fetchActiveAccount();
  }, [user]);

  // When an account is selected for viewing
  const handleAccountSelect = (account: any, type: "demo" | "live") => {
    setViewingAccount(account);
    setAccountType(type);
    
    // Scroll to trade history section
    setTimeout(() => {
      tradeHistoryRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  // Start automated trading when account is connected
  const handleAccountConnect = async (account: any, type: "demo" | "live") => {
    setConnectedAccount(account);
    setAccountType(type);
    setIsConnected(true);
    setViewingAccount(account); // Also set as viewing account

    // Start automated trading
    try {
      const response = await fetch(`${API_URL}/api/automated-trading/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          accountId: account._id,
          accountType: type,
          tradingAccountNumber: account.tradingAccountNumber
        })
      });

      const data = await response.json();
      if (data.success) {
        console.log('Automated trading started:', data);
      }
    } catch (error) {
      console.error('Error starting automated trading:', error);
    }
  };

  // Process trading cycle periodically
  useEffect(() => {
    if (!isConnected || !connectedAccount) return;

    const processCycle = async () => {
      try {
        const response = await fetch(`${API_URL}/api/automated-trading/cycle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accountType,
            accountId: connectedAccount._id,
            tradingAccountNumber: connectedAccount.tradingAccountNumber
          })
        });

        const data = await response.json();
        if (data.success) {
          console.log('Trading cycle processed:', data);
          // Trigger refresh of account data if needed
        }
      } catch (error) {
        console.error('Error processing trading cycle:', error);
      }
    };

    // Run cycle every 5 minutes (300000ms) for demo, 24 hours (86400000ms) for live
    const interval = accountType === 'demo' ? 300000 : 86400000;
    const cycleInterval = setInterval(processCycle, interval);

    return () => clearInterval(cycleInterval);
  }, [isConnected, connectedAccount, accountType]);

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Automation - Trading Autopilot</h1>
          <p className="text-muted-foreground">Connect your account and make use of our automated trading technology. Sit back and watch your money grow.</p>
        </div>

        <MarketSelector 
          selectedPair={selectedPair} 
          onSelectPair={setSelectedPair}
          onAccountTypeChange={setAccountType}
          onAccountConnect={handleAccountConnect}
          onAccountSelect={handleAccountSelect}
          connectedAccount={connectedAccount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            <TradingChart pair={selectedPair} onPriceUpdate={setCurrentPrice} />
          </div>
          <div>
            <TradeControls
              currentPrice={currentPrice}
              selectedPair={selectedPair}
              onTrade={handleTrade}
              accountType={accountType}
              isConnected={isConnected}
            />
          </div>
        </div>

        <div className="mt-4" ref={tradeHistoryRef}>
          <TradeHistory 
            accountType={accountType}
            tradingAccountNumber={viewingAccount?.tradingAccountNumber || connectedAccount?.tradingAccountNumber}
            isConnected={isConnected || !!viewingAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default Automation;
