import { Users, Home, CreditCard, List, ChevronLeft, ChevronRight, Wallet, Book, Briefcase, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void }) => (
  <aside className={`fixed inset-y-0 left-0 z-20 bg-card border-r p-4 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col ${!sidebarOpen ? 'max-md:hidden' : ''}`}>
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <img src="/lite-logo.jpg" alt="Admin Logo" width={32} height={32} className="rounded-full" />
        {sidebarOpen && <span className="text-2xl font-bold text-foreground font-sans">Admin</span>}
      </div>
      <button
        className="p-1 rounded hover:bg-muted"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Collapse sidebar"
      >
        {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
  <div className="flex-1 overflow-y-auto scrollbar-hide">
    <nav className="flex flex-col gap-2 font-sans text-base font-medium pb-4">
      <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Home className="h-5 w-5" />
        {sidebarOpen && <span>Dashboard</span>}
      </NavLink>
      <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Users className="h-5 w-5" />
        {sidebarOpen && <span>Users</span>}
      </NavLink>
      <NavLink to="/admin/admins" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Users className="h-5 w-5" />
        {sidebarOpen && <span>Admins</span>}
      </NavLink>
      <NavLink to="/admin/wallets" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Wallet className="h-5 w-5" />
        {sidebarOpen && <span>Wallets</span>}
      </NavLink>
      <NavLink to="/admin/demo-accounts" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Book className="h-5 w-5" />
        {sidebarOpen && <span>Demo Accounts</span>}
      </NavLink>
      <NavLink to="/admin/live-accounts" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <Briefcase className="h-5 w-5" />
        {sidebarOpen && <span>Live Accounts</span>}
      </NavLink>
      <NavLink to="/admin/deposits" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <ArrowDownCircle className="h-5 w-5" />
        {sidebarOpen && <span>Deposits</span>}
      </NavLink>
      <NavLink to="/admin/withdrawals" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <ArrowUpCircle className="h-5 w-5" />
        {sidebarOpen && <span>Withdrawals</span>}
      </NavLink>
      <NavLink to="/admin/referral-bonus" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <CreditCard className="h-5 w-5" />
        {sidebarOpen && <span>Referral Bonus</span>}
      </NavLink>
      <NavLink to="/admin/transfers" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <List className="h-5 w-5" />
        {sidebarOpen && <span>Transfers</span>}
      </NavLink>
      <NavLink to="/admin/usd-conversion" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}` }>
        <CreditCard className="h-5 w-5" />
        {sidebarOpen && <span>USD Conversion</span>}
      </NavLink>
    </nav>
  </div>
  <footer className="sticky bottom-0 pt-4 text-center text-xs text-muted-foreground bg-card">
    &copy; {new Date().getFullYear()} EquityVault Admin
  </footer>
  </aside>
);

export default AdminSidebar;
