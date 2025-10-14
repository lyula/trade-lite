import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, ChevronDown, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarExpand = () => {
    setSidebarOpen(true);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to the landing page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - hidden on mobile, always visible on desktop */}
      <div className="hidden md:block">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          onExpand={handleSidebarExpand}
        />
      </div>

      <div className={`flex-1 w-full md:w-auto ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (sidebarOpen) {
                setSidebarOpen(false);
              } else {
                setSidebarOpen(true);
              }
            }}
            className="md:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <div className="ml-auto flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                <span>Mr Sacred Baraka Lyula</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                  >
                    <User className="h-4 w-4" /> Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </header>

        {/* Mobile Sidebar - overlays content below header when toggled */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/50" onClick={handleSidebarClose}>
            <div className="w-64 h-full" onClick={(e) => e.stopPropagation()}>
              <Sidebar
                isOpen={sidebarOpen}
                onClose={handleSidebarClose}
                onExpand={handleSidebarExpand}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
