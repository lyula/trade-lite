
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import AdminTable from "@/components/admin/AdminTable";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
}

const columns: { header: string; accessor: keyof User }[] = [
  { header: "ID", accessor: "_id" },
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Email", accessor: "email" },
  { header: "Referral Code", accessor: "referralCode" },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        // Sort by most recent (assuming _id is ObjectId and newer means greater _id)
        const sorted = [...data].sort((a, b) => (a._id < b._id ? 1 : -1));
        setUsers(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <AdminTable columns={columns} data={paginatedUsers} />
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 rounded border bg-card text-muted-foreground disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-2">Page {page} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded border bg-card text-muted-foreground disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </AdminDashboardLayout>
  );
};

export default Users;
