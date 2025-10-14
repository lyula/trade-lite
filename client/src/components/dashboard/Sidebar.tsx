import { useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Workflow,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onExpand: () => void;
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

const Sidebar = ({ isOpen, onClose, onExpand }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSubmenu = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleDrag = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchmove", handleDrag);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchmove", handleDrag);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchmove", handleDrag);
    };
  }, [isOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-0 z-20 h-screen border-r bg-card transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          {isOpen ? (
            <>
              <span className="text-2xl font-bold text-foreground">Trade</span>
              <span className="text-2xl font-bold text-primary">Lite</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-primary">TL</span>
          )}
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
                  {item.name === "Dashboard" && (
                    <ChevronLeft
                      onClick={onClose}
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                    />
                  )}
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
            onClick={onExpand}
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
