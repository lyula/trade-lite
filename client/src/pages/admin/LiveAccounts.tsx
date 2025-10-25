
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";


import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const LiveAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  // Prefetch cache for pages
  const [pageCache, setPageCache] = useState({});

  useEffect(() => {
    async function fetchAccounts() {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/live-accounts/all?page=${page}&limit=${limit}&prefetch=10`);
      const data = await res.json();
      if (data.success) {
        // Cache all pages in the prefetch range
        let cache = { ...pageCache };
        for (let p = data.startPage; p <= data.endPage; p++) {
          const startIdx = (p - data.startPage) * limit;
          cache[p] = data.accounts.slice(startIdx, startIdx + limit);
        }
        setPageCache(cache);
        setAccounts(cache[page] || []);
        setTotal(data.total);
        // Calculate total balance for all records
        const totalBalance = data.accounts.reduce((sum, acc) => sum + (parseFloat(acc.balance) || 0), 0);
        setTotalBalance(totalBalance);
      }
      setLoading(false);
    }
    fetchAccounts();
    // eslint-disable-next-line
  }, [page, limit]);

  return (
    <AdminDashboardLayout>
  <h1 className="text-2xl font-bold mb-4">Live Accounts</h1>
  <div className="mb-4 text-lg font-semibold">Total Balance (All Live Accounts): <span className="text-primary">KES {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <table className="min-w-full text-sm border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Account Number</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Currency</th>
                <th className="px-4 py-2">Leverage</th>
                <th className="px-4 py-2">Equity</th>
                <th className="px-4 py-2">Balance</th>
                {/* <th className="px-4 py-2">Margin</th> */}
                {/* <th className="px-4 py-2">Credit</th> */}
                <th className="px-4 py-2">Platform</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(acc => (
                <tr key={acc._id} className="border-b">
                  <td className="px-4 py-2">{acc.number}</td>
                  <td className="px-4 py-2 font-mono font-bold">{acc.tradingAccountNumber}</td>
                  <td className="px-4 py-2">{acc.user?.firstName} {acc.user?.lastName} <br /><span className="text-xs text-muted-foreground">{acc.user?.email}</span></td>
                  <td className="px-4 py-2">{acc.accountType}</td>
                  <td className="px-4 py-2">{acc.currency}</td>
                  <td className="px-4 py-2">{acc.leverage}</td>
                  <td className="px-4 py-2">{acc.equity}</td>
                  <td className="px-4 py-2">{acc.balance}</td>
                  {/* <td className="px-4 py-2">{acc.margin}</td> */}
                  {/* <td className="px-4 py-2">{acc.credit}</td> */}
                  <td className="px-4 py-2">{acc.platform}</td>
                  <td className="px-4 py-2">{new Date(acc.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex items-center justify-between py-4">
          <button
            className="px-4 py-2 bg-muted rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >Prev</button>
          <span>Page {page} of {Math.ceil(total / limit) || 1}</span>
          <button
            className="px-4 py-2 bg-muted rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page * limit >= total}
          >Next</button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default LiveAccounts;
