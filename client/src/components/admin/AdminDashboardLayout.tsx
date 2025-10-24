import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, ChevronLeft, LogOut } from "lucide-react";
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
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <span className="font-bold text-lg">Admin Dashboard</span>
                  <div className="flex items-center gap-2 relative">
                    {adminEmail && (
                      <AdminEmailDropdown email={adminEmail} />
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


function AdminEmailDropdown({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/50 text-sm font-medium text-muted-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        {email}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-card border rounded shadow-lg z-50">
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted/50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardLayout;

// ...existing code...
