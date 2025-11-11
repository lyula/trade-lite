import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Wallet, CreditCard, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Plus, RefreshCw } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AccountCard from "@/components/dashboard/AccountCard";
import WalletCard from "@/components/dashboard/WalletCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import DeleteAccountModal from "@/components/dashboard/DeleteAccountModal";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Utility to format numbers with commas
function formatAmount(amount: number | string, decimals: number = 2) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0.00";
  return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
import { useUserContext } from "@/context/UserContext";


const API_URL = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  const navigate = useNavigate();
  const [liveAccounts, setLiveAccounts] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState({ deposits: [], withdrawals: [] });
  const { user } = useUserContext();

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.id) {
        setLiveAccounts([]);
        setDemoAccounts([]);
        setWallets([]);
        setRecentActivity({ deposits: [], withdrawals: [] });
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/live-accounts?userId=${user.id}`);
        const data = await res.json();
        setLiveAccounts(data.success && Array.isArray(data.accounts) ? data.accounts : []);
      } catch { setLiveAccounts([]); }
      try {
        const res = await fetch(`${API_URL}/api/demo-accounts?userId=${user.id}`);
        const data = await res.json();
        setDemoAccounts(data.success && Array.isArray(data.accounts) ? data.accounts : []);
      } catch { setDemoAccounts([]); }
      try {
        const res = await fetch(`${API_URL}/api/wallets?userId=${user.id}`);
        const data = await res.json();
        setWallets(data.success && Array.isArray(data.wallets) ? data.wallets : []);
      } catch { setWallets([]); }
      try {
        const res = await fetch(`${API_URL}/api/activity/recent?userId=${user.id}`);
        const data = await res.json();
        setRecentActivity(data.success ? { deposits: data.deposits || [], withdrawals: data.withdrawals || [] } : { deposits: [], withdrawals: [] });
      } catch { setRecentActivity({ deposits: [], withdrawals: [] }); }
      setLoading(false);
    }
    fetchData();
    window.addEventListener("dashboard-refresh", fetchData);
    return () => {
      window.removeEventListener("dashboard-refresh", fetchData);
    };
  }, [user]);

  // To trigger refresh after creating account/wallet, dispatch event:
  // window.dispatchEvent(new Event("dashboard-refresh"));
  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="border-success/20 bg-success/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-success" />
            <p className="text-sm">
              Join thousands of users using merchant trading bots on our platform. You can also lease your bot under shared splits for profits made.
            </p>
          </div>
          <Link to="/dashboard/automation">
            <Button className="bg-primary hover:bg-primary/90">Explore Automation</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Account Summary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Account Summary</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">USD</Badge>
            <Badge variant="outline">KES</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Example: Replace with actual totals if available */}
          <StatCard
            title="Total Balance"
            value={formatAmount(0.00) + " USD"}
            icon={Wallet}
          />
          <StatCard
            title="Total Credit"
            value={formatAmount(0.00) + " USD"}
            icon={CreditCard}
          />
          <StatCard
            title="Total Equity"
            value={formatAmount(0.00) + " USD"}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Deposits"
            value={formatAmount(0.00) + " USD"}
            icon={ArrowDownToLine}
            iconColor="text-success"
          />
        </div>


      </div>

      
      {/* Live Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Live Accounts</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate("/dashboard/create-account?type=live")}
          >
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>

        {/* Live accounts table layout */}
        <div className="rounded-lg overflow-x-auto border bg-white">
          {loading ? (
            <div className="text-center py-6">Loading live accounts...</div>
          ) : liveAccounts.length === 0 ? (
            <div className="text-center py-6">No live accounts yet.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-muted-foreground">
                  <th className="px-4 py-2 text-left">Account Details</th>
                  <th className="px-4 py-2 text-left">Leverage</th>
                  <th className="px-4 py-2 text-left">Equity</th>
                  <th className="px-4 py-2 text-left">Balance</th>
                  <th className="px-4 py-2 text-left">Margin</th>
                  <th className="px-4 py-2 text-left">Credit</th>
                  <th className="px-4 py-2 text-left">Platforms</th>
                  <th className="px-4 py-2 text-left">Action</th>
                  <th className="px-4 py-2 text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {liveAccounts.map(account => (
                  <tr key={account._id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-success/10 text-success">{account.currency}</Badge>
                        <span className="font-semibold">{account.tradingAccountNumber}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{account.accountType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                    </td>
                    <td className="px-4 py-2">{account.leverage}</td>
                    <td className="px-4 py-2">{formatAmount(account.equity ?? 0, 2)}</td>
                    <td className="px-4 py-2">{formatAmount(account.balance ?? 0, 4)}</td>
                    <td className="px-4 py-2">{formatAmount(account.margin ?? 0, 2)}</td>
                    <td className="px-4 py-2">{formatAmount(account.credit ?? 0, 2)}</td>
                    <td className="px-4 py-2">
                      <span className="font-semibold">{account.platform}</span>
                    </td>
                    <td className="px-4 py-2">
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/transfer-funds')}>Deposit</Button>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button size="icon" variant="ghost">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setSelectedAccount(account);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <span role="img" aria-label="options">⋮</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Delete Modal for Live Accounts */}
        {selectedAccount && (
          <DeleteAccountModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            accountNumber={selectedAccount.tradingAccountNumber}
            accountType={selectedAccount.accountType}
            onDelete={async (accNum, accType) => {
              const API_URL = import.meta.env.VITE_BACKEND_URL;
              // Find the account by tradingAccountNumber to get its _id
              const account = liveAccounts.find(a => a.tradingAccountNumber === accNum);
              if (!account) {
                alert("Account not found.");
                return;
              }
              try {
                const res = await fetch(`${API_URL}/api/live-accounts/${account._id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                if (data.success) {
                  setLiveAccounts(liveAccounts.filter(a => a._id !== account._id));
                  setOpenDeleteModal(false);
                } else {
                  alert(data.error || "Failed to delete account.");
                }
              } catch (err) {
                alert("Error deleting account.");
              }
            }}
          />
        )}
      </div>

      {/* Demo Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Demo Accounts</h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/dashboard/create-account?type=demo')}
          >
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>
        {loading ? (
          <div className="text-center text-muted-foreground py-6">Loading demo accounts...</div>
        ) : demoAccounts.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">No demo accounts yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {demoAccounts.map((account) => (
              <AccountCard
                key={account._id}
                accountNumber={account.tradingAccountNumber}
                accountType={account.accountType}
                currency={account.currency}
                leverage={account.leverage}
                equity={formatAmount(account.equity ?? 10000, 2)}
                balance={formatAmount(account.balance ?? 10000, 2)}
                margin={formatAmount(account.margin ?? 0, 2)}
                platforms={[account.platform]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Wallet Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Wallet Accounts</h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/dashboard/create-wallet')}
          >
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>
        {loading ? (
          <div className="text-center text-muted-foreground py-6">Loading wallets...</div>
        ) : wallets.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">No wallets yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet._id}
                currency={wallet.currency}
                accountNumber={wallet.walletId}
                balance={formatAmount(wallet.balance ?? 0, 3)}
                currencyColor={wallet.currency === "KES" ? "warning" : "success"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        {recentActivity.deposits.length === 0 && recentActivity.withdrawals.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">No recent activity.</div>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                {[...recentActivity.deposits, ...recentActivity.withdrawals]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((activity) => (
                    <ActivityItem
                      key={activity._id}
                      date={new Date(activity.createdAt).toLocaleString()}
                      description={activity.amount > 0 ? `Deposit` : `Withdrawal`}
                      accountNumber={activity.walletId}
                      status="Accepted"
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
