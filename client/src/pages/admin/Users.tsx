
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import AdminTable from "@/components/admin/AdminTable";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
  referredBy?: string;
  number?: number;
  walletBalance?: number;
}

const columns: { header: string; accessor: keyof User | "number" }[] = [
  { header: "#", accessor: "number" },
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Email", accessor: "email" },
  { header: "Referral Code", accessor: "referralCode" },
  { header: "Referred By", accessor: "referredBy" },
  { header: "Wallet Balance (KES)", accessor: "walletBalance" },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    setLoading(true);
    setError("");
    if (search) {
      // Use backend endpoint for referral code search
      const params = new URLSearchParams();
      params.append("referralCode", search);
      params.append("page", String(page));
      params.append("limit", String(ITEMS_PER_PAGE));
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/search-by-referral?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch users");
          return res.json();
        })
        .then((data) => {
          setUsers(Array.isArray(data.users) ? data.users : []);
          setTotal(typeof data.total === "number" ? data.total : 0);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      // Paginate normal users table from backend
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", String(ITEMS_PER_PAGE));
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch users");
          return res.json();
        })
        .then((data) => {
          setUsers(Array.isArray(data.users) ? data.users : []);
          setTotal(typeof data.total === "number" ? data.total : 0);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [search, page]);

  // Pagination logic
  // Remove duplicate, use only filteredUsers for totalPages
  // Add continuous numbering to paginated users
  const [total, setTotal] = useState<number>(0);
  let paginatedUsers: User[] = [];
  let totalPages = typeof total === "number" && total > 0 ? Math.ceil(total / ITEMS_PER_PAGE) : 1;

  if (search) {
    // Referral code search: owner at top (not numbered), referred users below, highest number at top
    if (Array.isArray(users) && users.length > 0) {
      // Assume first user is owner, rest are referrals
      const owner = users[0];
      const referrals = users.slice(1);
      const referralCount = referrals.length;
      paginatedUsers = [
        { ...owner, walletBalance: owner.walletBalance ?? 0.00 },
        ...referrals.map((user, idx) => ({
          ...user,
          number: referralCount - idx,
          walletBalance: user.walletBalance ?? 0.00
        }))
      ];
    } else {
      paginatedUsers = [];
    }
  } else {
    // Normal table: most recent user has highest number, continuous numbering
    if (Array.isArray(users) && users.length > 0 && typeof total === "number" && total > 0) {
      paginatedUsers = users.map((user, idx) => ({
        ...user,
        number: total - ((page - 1) * ITEMS_PER_PAGE + idx),
        walletBalance: user.walletBalance ?? 0.00
      }));
    } else if (Array.isArray(users) && users.length > 0) {
      paginatedUsers = users.map((user, idx) => ({
        ...user,
        number: users.length - idx,
        walletBalance: user.walletBalance ?? 0.00
      }));
    } else {
      paginatedUsers = [];
    }
  }

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <form
              className="flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                setSearch(pendingSearch);
                setPage(1);
              }}
            >
              <input
                type="text"
                placeholder="Search by referral code..."
                value={pendingSearch}
                onChange={e => {
                  const value = e.target.value;
                  setPendingSearch(value);
                  if (value === "") {
                    setSearch("");
                    setPage(1);
                  }
                }}
                className="px-3 py-2 border rounded w-64"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setSearch(pendingSearch);
                    setPage(1);
                  }
                }}
              />
              <button
                type="button"
                className="px-3 py-2 rounded bg-primary text-white"
                onClick={() => {
                  setSearch(pendingSearch);
                  setPage(1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </button>
            </form>
          </div>
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
