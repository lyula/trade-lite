import React from "react";
import { PanelLeft, TrendingUp, Wallet } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen overflow-y-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-foreground">Equity Vault</span>
      </div>

      <nav className="space-y-4">
        <a href="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
          Dashboard
        </a>
        <a href="/deposits" className="block text-muted-foreground hover:text-foreground transition-colors">
          Deposits
        </a>
        <a href="/withdrawals" className="block text-muted-foreground hover:text-foreground transition-colors">
          Withdrawals
        </a>
        <a href="/transfers" className="block text-muted-foreground hover:text-foreground transition-colors">
          Transfers
        </a>
        <a href="/reports" className="block text-muted-foreground hover:text-foreground transition-colors">
          Reports
        </a>
        <a href="/analysis" className="block text-muted-foreground hover:text-foreground transition-colors">
          Analysis
        </a>
        <a href="/platforms" className="block text-muted-foreground hover:text-foreground transition-colors">
          Platforms
        </a>
        <a href="/refer" className="block text-muted-foreground hover:text-foreground transition-colors">
          Refer a Friend
        </a>
      </nav>

      <footer className="mt-auto text-sm text-muted-foreground">
        <a href="/legal" className="block hover:text-foreground transition-colors">
          Legal Terms and Policies
        </a>
      </footer>
    </aside>
  );
};

export default Sidebar;