
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { useEffect, useState } from "react";

const USDConversion = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRate() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conversion`);
        const data = await res.json();
        setRate(data.rate);
        setUpdatedAt(data.updatedAt);
      } catch (err) {
        setError("Failed to fetch conversion rate.");
      }
      setLoading(false);
    }
    fetchRate();
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">USD Conversion</h1>
      <div className="p-6 bg-card rounded shadow">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-sm border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left">Base Currency</th>
                <th className="px-4 py-2 text-left">Target Currency</th>
                <th className="px-4 py-2 text-left">Conversion Rate</th>
                <th className="px-4 py-2 text-left">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-left">USD</td>
                <td className="px-4 py-2 text-left">KES</td>
                <td className="px-4 py-2 text-left">{rate !== null ? rate : "--"}</td>
                <td className="px-4 py-2 text-left">{updatedAt ? new Date(updatedAt).toLocaleString() : "--"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default USDConversion;
