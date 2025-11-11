import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserContext } from "@/context/UserContext";
import { Link2, Wallet, TrendingUp, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface MarketSelectorProps {
  selectedPair: string;
  onSelectPair: (pair: string) => void;
  onAccountTypeChange?: (type: "demo" | "live") => void;
  onAccountConnect?: (account: any, type: "demo" | "live") => void;
  onAccountSelect?: (account: any, type: "demo" | "live") => void;
  connectedAccount?: any;
}

interface Account {
  _id: string;
  tradingAccountNumber: string;
  currency: string;
  balance: number;
  accountType?: string;
  isAutomatedTradingActive?: boolean; // Track if automation is active
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const MarketSelector = ({ selectedPair, onSelectPair, onAccountTypeChange, onAccountConnect, onAccountSelect, connectedAccount }: MarketSelectorProps) => {
  const { user } = useUserContext();
  const [liveAccounts, setLiveAccounts] = useState<Account[]>([]);
  const [demoAccounts, setDemoAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [accountType, setAccountType] = useState<"demo" | "live">("demo");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<"connect" | "select">("connect"); // Toggle between connect and select modes

  useEffect(() => {
    async function fetchAccounts() {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }
      try {
        const [liveRes, demoRes] = await Promise.all([
          fetch(`${API_URL}/api/live-accounts?userId=${user.id}`),
          fetch(`${API_URL}/api/demo-accounts?userId=${user.id}`),
        ]);
        const liveData = await liveRes.json();
        const demoData = await demoRes.json();
        
        setLiveAccounts(liveData.success && Array.isArray(liveData.accounts) ? liveData.accounts : []);
        setDemoAccounts(demoData.success && Array.isArray(demoData.accounts) ? demoData.accounts : []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAccounts();
  }, [user]);

  // Set view mode based on whether there's a connected account
  useEffect(() => {
    if (connectedAccount) {
      setIsConnected(true);
      setViewMode("select");
    } else {
      // Check if any account has automation active
      const hasActiveAccount = 
        [...liveAccounts, ...demoAccounts].some(acc => acc.isAutomatedTradingActive);
      
      if (hasActiveAccount) {
        setViewMode("select");
      }
    }
  }, [connectedAccount, liveAccounts, demoAccounts]);

  const handleConnect = () => {
    setError("");
    
    if (!selectedAccount) {
      setError("Please select an account to connect");
      return;
    }

    const accountDetails = currentAccounts.find(
      (acc) => acc.tradingAccountNumber === selectedAccount
    );

    if (!accountDetails) {
      setError("Selected account not found");
      return;
    }

    // Check if this account already has automation active (from database or current connection)
    if (accountDetails.isAutomatedTradingActive || (connectedAccount && accountDetails.tradingAccountNumber === connectedAccount.tradingAccountNumber)) {
      setError("This account already has active automation. You can view its performance but cannot reconnect.");
      return;
    }

    // Check if balance is $0
    if (accountDetails.balance <= 0) {
      setError(
        `Insufficient balance. Your ${accountType === "demo" ? "demo" : "live"} account has ${accountDetails.currency} 0.00. Please fund your account before connecting to the market.`
      );
      return;
    }

    setIsConnected(true);
    if (onAccountTypeChange) {
      onAccountTypeChange(accountType);
    }
    if (onAccountConnect && accountDetails) {
      onAccountConnect(accountDetails, accountType);
    }
  };

  const handleDisconnect = () => {
    // Call backend to stop automation
    if (connectedAccount) {
      fetch(`${API_URL}/api/automated-trading/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountType: accountType,
          tradingAccountNumber: connectedAccount.tradingAccountNumber
        })
      }).catch(error => {
        console.error('Error stopping automation:', error);
      });
    }

    setIsConnected(false);
    setSelectedAccount("");
    setError("");
    setViewMode("connect");
    if (onAccountTypeChange) {
      onAccountTypeChange("demo");
    }
  };

  const handleViewAccount = () => {
    setError("");
    
    if (!selectedAccount) {
      setError("Please select an account to view");
      return;
    }

    const accountDetails = currentAccounts.find(
      (acc) => acc.tradingAccountNumber === selectedAccount
    );

    if (!accountDetails) {
      setError("Selected account not found");
      return;
    }

    if (onAccountSelect) {
      onAccountSelect(accountDetails, accountType);
    }
  };

  const currentAccounts = accountType === "demo" ? demoAccounts : liveAccounts;
  const selectedAccountDetails = currentAccounts.find(
    (acc) => acc.tradingAccountNumber === selectedAccount
  );

  return (
    <Card className="p-4 bg-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Connect Account to Market
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect your trading account to automated crypto market trading
        </p>
      </div>

      {loading ? (
        <div className="text-center py-4 text-muted-foreground">Loading accounts...</div>
      ) : isConnected && connectedAccount ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-semibold text-foreground">Automation Active</div>
                <div className="text-sm text-muted-foreground">
                  {connectedAccount.accountType || (accountType === "demo" ? "Demo" : "Live")} Account: {connectedAccount.tradingAccountNumber}
                </div>
              </div>
            </div>
            <Badge variant={accountType === "demo" ? "secondary" : "default"} className={accountType === "live" ? "bg-green-600" : ""}>
              {accountType === "demo" ? "DEMO" : "LIVE"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
            <div>
              <div className="text-xs text-muted-foreground">Account Balance</div>
              <div className="text-lg font-bold text-foreground">
                {connectedAccount.currency} {connectedAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Status</div>
              <div className="text-lg font-bold text-green-500">Running</div>
            </div>
          </div>

          {/* Account Selector for Viewing */}
          <div className="border-t pt-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              View Account History
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button
                variant={accountType === "demo" ? "default" : "outline"}
                onClick={() => {
                  setAccountType("demo");
                  setSelectedAccount("");
                  if (onAccountTypeChange) {
                    onAccountTypeChange("demo");
                  }
                }}
                size="sm"
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Demo ({demoAccounts.length})
              </Button>
              <Button
                variant={accountType === "live" ? "default" : "outline"}
                onClick={() => {
                  setAccountType("live");
                  setSelectedAccount("");
                  if (onAccountTypeChange) {
                    onAccountTypeChange("live");
                  }
                }}
                size="sm"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Live ({liveAccounts.length})
              </Button>
            </div>
            
            {currentAccounts.length > 0 && (
              <div className="space-y-2">
                <Select value={selectedAccount} onValueChange={(value) => {
                  setSelectedAccount(value);
                  setError("");
                  // Auto-select account when changed
                  const accountDetails = currentAccounts.find(
                    (acc) => acc.tradingAccountNumber === value
                  );
                  if (accountDetails && onAccountSelect) {
                    onAccountSelect(accountDetails, accountType);
                  }
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account to view" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentAccounts.map((account) => {
                      // Check both database field and current connection
                      const isConnected = (connectedAccount && account.tradingAccountNumber === connectedAccount.tradingAccountNumber) || account.isAutomatedTradingActive;
                      return (
                        <SelectItem
                          key={account.tradingAccountNumber}
                          value={account.tradingAccountNumber}
                        >
                          <div className="flex items-center justify-between w-full gap-2">
                            <span>{account.tradingAccountNumber} - {account.currency} {account.balance.toFixed(2)}</span>
                            {isConnected && <Badge className="ml-2 bg-green-600 text-white text-xs">Active</Badge>}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {selectedAccount && (
                  <>
                    <p className="text-xs text-muted-foreground">
                      {(() => {
                        const selectedAccountDetails = currentAccounts.find(acc => acc.tradingAccountNumber === selectedAccount);
                        const isActiveAccount = (connectedAccount && selectedAccount === connectedAccount.tradingAccountNumber) || selectedAccountDetails?.isAutomatedTradingActive;
                        
                        return isActiveAccount 
                          ? "This account has active automation running" 
                          : "You can activate automation for this account";
                      })()}
                    </p>
                    {(() => {
                      const selectedAccountDetails = currentAccounts.find(acc => acc.tradingAccountNumber === selectedAccount);
                      const isActiveAccount = (connectedAccount && selectedAccount === connectedAccount.tradingAccountNumber) || selectedAccountDetails?.isAutomatedTradingActive;
                      
                      if (isActiveAccount) {
                        return (
                          <Button
                            onClick={handleDisconnect}
                            variant="destructive"
                            className="w-full mt-2"
                            size="sm"
                          >
                            Disconnect & Stop Automation
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            onClick={() => {
                              // Activate automation for this specific account
                              setIsConnected(true);
                              if (onAccountTypeChange) {
                                onAccountTypeChange(accountType);
                              }
                              if (onAccountConnect && selectedAccountDetails) {
                                onAccountConnect(selectedAccountDetails, accountType);
                              }
                            }}
                            className="w-full mt-2"
                            size="sm"
                            disabled={selectedAccountDetails?.balance <= 0}
                          >
                            <Link2 className="mr-2 h-4 w-4" />
                            Activate Automation
                          </Button>
                        );
                      }
                    })()}
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            onClick={handleDisconnect}
            variant="outline"
            className="w-full"
          >
            Close View
          </Button>
        </div>
      ) : isConnected && selectedAccountDetails ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-semibold text-foreground">Connected</div>
                <div className="text-sm text-muted-foreground">
                  {accountType === "demo" ? "Demo" : "Live"} Account: {selectedAccountDetails.tradingAccountNumber}
                </div>
              </div>
            </div>
            <Badge variant={accountType === "demo" ? "secondary" : "default"} className={accountType === "live" ? "bg-green-600" : ""}>
              {accountType === "demo" ? "DEMO" : "LIVE"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
            <div>
              <div className="text-xs text-muted-foreground">Account Balance</div>
              <div className="text-lg font-bold text-foreground">
                {selectedAccountDetails.currency} {selectedAccountDetails.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Trading Pair</div>
              <div className="text-lg font-bold text-foreground">{selectedPair}</div>
            </div>
          </div>

          <Button
            onClick={handleDisconnect}
            variant="outline"
            className="w-full"
          >
            Disconnect Account
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {demoAccounts.length === 0 && liveAccounts.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">No trading accounts found</p>
              <p className="text-sm text-muted-foreground">Create an account to start trading</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={accountType === "demo" ? "default" : "outline"}
                  onClick={() => {
                    setAccountType("demo");
                    setSelectedAccount("");
                    if (onAccountTypeChange) {
                      onAccountTypeChange("demo");
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Demo ({demoAccounts.length})
                </Button>
                <Button
                  variant={accountType === "live" ? "default" : "outline"}
                  onClick={() => {
                    setAccountType("live");
                    setSelectedAccount("");
                    if (onAccountTypeChange) {
                      onAccountTypeChange("live");
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Live ({liveAccounts.length})
                </Button>
              </div>

              {currentAccounts.length > 0 ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Select {accountType === "demo" ? "Demo" : "Live"} Account
                    </label>
                    <Select value={selectedAccount} onValueChange={(value) => {
                      setSelectedAccount(value);
                      setError("");
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentAccounts.map((account) => {
                          const isConnected = connectedAccount && account.tradingAccountNumber === connectedAccount.tradingAccountNumber;
                          return (
                            <SelectItem
                              key={account.tradingAccountNumber}
                              value={account.tradingAccountNumber}
                            >
                              <div className="flex items-center justify-between w-full gap-2">
                                <span>{account.tradingAccountNumber} - {account.currency} {account.balance.toFixed(2)}</span>
                                {isConnected && <Badge className="ml-2 bg-green-600 text-white text-xs">Active</Badge>}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedAccount && connectedAccount && selectedAccount === connectedAccount.tradingAccountNumber && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-sm text-blue-800">
                        This account is currently running automation. You can view its performance but cannot activate it again.
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedAccount && !connectedAccount && currentAccounts.find(acc => acc.tradingAccountNumber === selectedAccount)?.isAutomatedTradingActive && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-sm text-blue-800">
                        This account has active automation. Viewing performance mode.
                      </AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  {(() => {
                    const selectedAccountDetails = currentAccounts.find(acc => acc.tradingAccountNumber === selectedAccount);
                    const isActiveInDatabase = selectedAccountDetails?.isAutomatedTradingActive;
                    const isConnectedAccount = connectedAccount && selectedAccount === connectedAccount.tradingAccountNumber;
                    const isActiveAccount = isConnectedAccount || isActiveInDatabase;

                    if (selectedAccount && isActiveAccount) {
                      return (
                        <Button
                          onClick={() => {
                            // Just view the account, don't reconnect
                            if (selectedAccountDetails && onAccountSelect) {
                              onAccountSelect(selectedAccountDetails, accountType);
                            }
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          View Account Performance
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          onClick={handleConnect}
                          disabled={!selectedAccount}
                          className="w-full"
                        >
                          <Link2 className="mr-2 h-4 w-4" />
                          Activate Automation
                        </Button>
                      );
                    }
                  })()}
                </>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No {accountType} accounts available
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};
