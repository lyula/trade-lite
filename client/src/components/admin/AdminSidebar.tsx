import { Users, Home, CreditCard, List, ChevronLeft, ChevronRight, Wallet, Rocket, Briefcase, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void }) => (
  <aside className={`fixed inset-y-0 left-0 z-20 bg-card border-r p-4 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} flex flex-col ${!sidebarOpen ? 'hidden md:flex' : ''}`}>
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <img src="/lite-logo.jpg" alt="Admin Logo" width={32} height={32} className="rounded-full" />
        {sidebarOpen && <span className="text-xl font-bold text-foreground">Admin</span>}
      </div>
      <button
        className="p-1 rounded hover:bg-muted"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Collapse sidebar"
      >
        {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
    <nav className="flex flex-col gap-2">
      <Link to="/admin/dashboard" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <Home className="h-5 w-5" />
        {sidebarOpen && <span>Dashboard</span>}
      </Link>
      <Link to="/admin/users" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <Users className="h-5 w-5" />
        {sidebarOpen && <span>Users</span>}
      </Link>
      <Link to="/admin/wallets" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <Wallet className="h-5 w-5" />
        {sidebarOpen && <span>Wallets</span>}
      </Link>
      <Link to="/admin/demo-accounts" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <Rocket className="h-5 w-5" />
        {sidebarOpen && <span>Demo Accounts</span>}
      </Link>
      <Link to="/admin/live-accounts" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <Briefcase className="h-5 w-5" />
        {sidebarOpen && <span>Live Accounts</span>}
      </Link>
      <Link to="/admin/transactions" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <ArrowDownCircle className="h-5 w-5" />
        {sidebarOpen && <span>Deposits</span>}
      </Link>
      <Link to="/admin/transactions" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted">
        <ArrowUpCircle className="h-5 w-5" />
        {sidebarOpen && <span>Withdrawals</span>}
      </Link>
    </nav>
  </aside>
);

export default AdminSidebar;
