import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">--</p>
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
