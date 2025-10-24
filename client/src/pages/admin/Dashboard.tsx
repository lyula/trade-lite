import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?page=1&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.total === "number") setTotalUsers(data.total);
      });
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-card rounded-lg p-6 shadow cursor-pointer hover:bg-muted/50 transition"
          onClick={() => navigate("/admin/users")}
        >
          <h2 className="text-lg font-bold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers !== null ? totalUsers : "--"}</p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-2">Total Accounts</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-2">Total Transactions</h2>
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
