import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-6 hidden md:block">
        <div className="mb-8">
          <span className="text-2xl font-bold text-foreground">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/users" className="hover:text-primary">Users</Link>
          <Link to="/admin/accounts" className="hover:text-primary">Accounts</Link>
          <Link to="/admin/transactions" className="hover:text-primary">Transactions</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default AdminLayout;
