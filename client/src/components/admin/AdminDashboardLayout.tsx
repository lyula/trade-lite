import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { useAdmin } from "@/hooks/use-admin";

const AdminDashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

  const { adminEmail } = useAdmin();
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 w-full transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-lg">Admin Dashboard</span>
          <div className="flex items-center gap-2">
            {adminEmail && (
              <span className="text-sm font-medium text-muted-foreground">{adminEmail}</span>
            )}
          </div>
        </header>
        <main className="p-4 md:p-6">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
