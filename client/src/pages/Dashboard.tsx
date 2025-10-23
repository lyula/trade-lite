import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Wallet, CreditCard, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Plus } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AccountCard from "@/components/dashboard/AccountCard";
import WalletCard from "@/components/dashboard/WalletCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import React from "react";


const Dashboard = () => {
  const navigate = useNavigate();

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
          <StatCard
            title="Total Balance"
            value="0.00 USD"
            subtitle="Total Withdrawals"
            icon={Wallet}
          />
          <StatCard
            title="Total Credit"
            value="0.00 USD"
            icon={CreditCard}
          />
          <StatCard
            title="Total Equity"
            value="0.00 USD"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Deposits"
            value="0.00 USD"
            icon={ArrowDownToLine}
            iconColor="text-success"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Total Withdrawals</div>
            <div className="text-2xl font-bold">0.00 USD</div>
          </CardContent>
        </Card>
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

        {/* Summary Row */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[auto,1fr,auto,auto,auto,auto] md:items-center">
              <Badge variant="secondary" className="bg-success/10 text-success w-fit">
                USD
              </Badge>
              <span className="font-semibold">Total</span>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Equity</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Margin</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Credit</p>
                  <p className="font-semibold">0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details Header */}
        <div className="hidden rounded-lg bg-muted/50 p-4 md:block">
          <div className="grid grid-cols-[auto,1fr,auto,auto,auto,auto,auto,auto] gap-4 text-sm font-medium text-muted-foreground">
            <div>Account Details</div>
          </div>
        </div>

        {/* No live accounts by default */}
        <div className="text-center text-muted-foreground py-6">No live accounts yet.</div>
      </div>

      {/* Demo Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Demo Accounts</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate("/dashboard/create-account?type=demo")}
          >
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>

        {/* Summary Row */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[auto,1fr,auto,auto,auto,auto] md:items-center">
              <Badge variant="secondary" className="bg-success/10 text-success w-fit">
                USD
              </Badge>
              <span className="font-semibold">Total</span>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Equity</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Margin</p>
                  <p className="font-semibold">0.00</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Credit</p>
                  <p className="font-semibold">0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details Header */}
        <div className="hidden rounded-lg bg-muted/50 p-4 md:block">
          <div className="grid grid-cols-[auto,1fr,auto,auto,auto,auto,auto,auto] gap-4 text-sm font-medium text-muted-foreground">
            <div>Account Details</div>
          </div>
        </div>

        {/* No demo accounts by default */}
        <div className="text-center text-muted-foreground py-6">No demo accounts yet.</div>
      </div>


      {/* Wallet Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Wallet Accounts</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate("/dashboard/create-wallet")}
          >
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>

        {/* No wallet accounts by default */}
        <div className="text-center text-muted-foreground py-6">No wallet account yet.</div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          {/* Hide View More if no activity */}
        </CardHeader>
        <CardContent className="space-y-0">
          <div className="text-center text-muted-foreground py-6">
            No recent activity yet.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
