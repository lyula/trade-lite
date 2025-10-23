import { NavLink, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  Workflow,
  LineChart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onExpand: () => void;
  onToggle?: (isOpen: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", hasSubmenu: false },
  { name: "Deposits", icon: Wallet, path: "/dashboard/deposits", hasSubmenu: false },
  { name: "Withdrawals", icon: Wallet, path: "/dashboard/withdrawals", hasSubmenu: false },
  { name: "Transfers", icon: ArrowLeftRight, path: "/dashboard/transfers", hasSubmenu: false },
  { name: "Reports", icon: FileText, path: "/dashboard/reports", hasSubmenu: false },
  { name: "Automation", icon: Workflow, path: "/dashboard/automation", hasSubmenu: false },
  { name: "Markets", icon: LineChart, path: "/dashboard/markets", hasSubmenu: false },
  { name: "Platforms", icon: Monitor, path: "/dashboard/platforms", hasSubmenu: false },
  { name: "Refer a Friend", icon: Gift, path: "/dashboard/refer", hasSubmenu: false },
  { name: "Profile", icon: User, path: "/dashboard/profile", hasSubmenu: false },
];

const Sidebar = ({ isOpen, onClose, onExpand, onToggle }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSubmenu = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    }
  };



  return (
    <aside
      className={cn(
        "bg-card transition-all duration-300 border-r",
        "h-screen overflow-y-auto",
        "w-full md:w-auto",
        isOpen ? "md:w-48" : "md:w-16"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground md:hidden">Trade</span>
          <span className="text-2xl font-bold text-primary md:hidden">Lite</span>
          {isOpen ? (
            <>
              <span className="hidden md:inline text-2xl font-bold text-foreground">Trade</span>
              <span className="hidden md:inline text-2xl font-bold text-primary">Lite</span>
            </>
          ) : (
            <span className="hidden md:inline text-2xl font-bold text-primary">TL</span>
          )}
        </div>
      </div>

      <nav className="space-y-1 p-2">
        {menuItems.map((item) => (
          <div key={item.name}>
            <NavLink
              to={item.path}
              onClick={e => {
                if (item.hasSubmenu) {
                  e.preventDefault();
                  toggleSubmenu(item.name);
                  return;
                }
                if (typeof window !== "undefined" && window.innerWidth < 768 && onToggle) {
                  onToggle(false);
                }
              }}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left w-full",
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
                  {item.name === "Dashboard" && (
                    <ChevronLeft
                      onClick={toggleSidebar}
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                    />
                  )}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full border-t p-4">
        {isOpen ? (
          <NavLink
            to="/dashboard/legal"
            className="text-sm font-medium text-primary hover:underline"
          >
            Legal Terms and Policies
          </NavLink>
        ) : (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full p-2 text-primary hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
