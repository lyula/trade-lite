import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { useEffect, useState } from "react";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/list`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admins");
        return res.json();
      })
      .then((data) => {
        setAdmins(data.admins || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Admins</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Created At (EAT)</th>
            </tr>
          </thead>
          <tbody>
            {admins.slice().reverse().map((admin, idx) => (
              <tr key={admin._id} className="border-b">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{
                  (() => {
                    const date = new Date(admin.createdAt);
                    // Convert to EAT (UTC+3)
                    const eatDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
                    return eatDate.toLocaleString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    });
                  })()
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminDashboardLayout>
  );
};

export default Admins;
