import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
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
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                    <User className="h-4 w-4" /> Profile
                  </a>
                </li>
                <li>
                  <a href="/logout" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                    <LogOut className="h-4 w-4" /> Logout
                  </a>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </header>
        
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
