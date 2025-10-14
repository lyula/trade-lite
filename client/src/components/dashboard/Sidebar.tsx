import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
  Monitor,
  Gift,
  ChevronDown,
  Workflow,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", hasSubmenu: false },
  { name: "Deposits", icon: ArrowDownToLine, path: "/dashboard/deposits", hasSubmenu: false },
  { name: "Withdrawals", icon: ArrowUpFromLine, path: "/dashboard/withdrawals", hasSubmenu: false },
  { name: "Transfers", icon: ArrowLeftRight, path: "/dashboard/transfers", hasSubmenu: false },
  { name: "Reports", icon: FileText, path: "/dashboard/reports", hasSubmenu: false },
  { name: "Analysis", icon: TrendingUp, path: "/dashboard/analysis", hasSubmenu: false },
  { name: "Automation", icon: Workflow, path: "/dashboard/automation", hasSubmenu: false },
  { name: "Markets", icon: LineChart, path: "/dashboard/markets", hasSubmenu: false },
  { name: "Platforms", icon: Monitor, path: "/dashboard/platforms", hasSubmenu: false },
  { name: "Refer a Friend", icon: Gift, path: "/dashboard/refer", hasSubmenu: false },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen border-r bg-card transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">Trade</span>
          {isOpen && <span className="text-2xl font-bold text-primary">Lite</span>}
        </div>
      </div>

      <nav className="space-y-1 p-2">
        {menuItems.map((item) => (
          <div key={item.name}>
            <NavLink
              to={item.path}
              onClick={(e) => {
                if (item.hasSubmenu) {
                  e.preventDefault();
                  toggleSubmenu(item.name);
                }
              }}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive && !item.hasSubmenu
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.includes(item.name) && "rotate-180"
                      )}
                    />
                  )}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </nav>

      {isOpen && (
        <div className="absolute bottom-0 w-full border-t p-4">
          <NavLink
            to="/dashboard/legal"
            className="text-sm font-medium text-primary hover:underline"
          >
            Legal Terms and Policies
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
