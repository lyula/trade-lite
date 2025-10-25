import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalAdmins, setTotalAdmins] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?page=1&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total === "number") setTotalUsers(data.total);
      });
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/list`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.admins)) setTotalAdmins(data.admins.length);
      });
  }, []);

  return (
    <AdminDashboardLayout>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/users")}
        >
          <h2 className="text-lg font-bold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers !== null ? totalUsers : "--"}</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/admins")}
        >
          <h2 className="text-lg font-bold mb-2">Admins</h2>
          <p className="text-3xl font-bold">{totalAdmins !== null ? totalAdmins : "--"}</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/deposits")}
        >
          <h2 className="text-lg font-bold mb-2">Deposits</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/withdrawals")}
        >
          <h2 className="text-lg font-bold mb-2">Withdrawals</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/live-accounts")}
        >
          <h2 className="text-lg font-bold mb-2">Live Accounts</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/demo-accounts")}
        >
          <h2 className="text-lg font-bold mb-2">Demo Accounts</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/wallets")}
        >
          <h2 className="text-lg font-bold mb-2">Wallets</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card rounded-lg p-6 shadow">
          <p>No recent activity.</p>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
