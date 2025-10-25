import React from "react";

import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";


import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  // Prefetch cache for pages
  const [pageCache, setPageCache] = useState({});

  useEffect(() => {
    async function fetchWallets() {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/wallets/all?page=${page}&limit=${limit}&prefetch=10`);
      const data = await res.json();
      if (data.success) {
        // Cache all pages in the prefetch range
        let cache = { ...pageCache };
        for (let p = data.startPage || page; p <= (data.endPage || page); p++) {
          const startIdx = (p - (data.startPage || page)) * limit;
          cache[p] = data.wallets.slice(startIdx, startIdx + limit);
        }
        setPageCache(cache);
        setWallets(cache[page] || []);
        setTotal(data.total);
        // Calculate total balance for all records
        const totalBalance = data.wallets.reduce((sum, w) => sum + (parseFloat(w.balance) || 0), 0);
        setTotalBalance(totalBalance);
      }
      setLoading(false);
    }
    fetchWallets();
    // eslint-disable-next-line
  }, [page, limit]);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Wallets</h1>
      <div className="mb-4 text-lg font-semibold">Total Balance (All Wallets): <span className="text-primary">KES {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <table className="min-w-full text-sm border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Wallet ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Currency</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(w => (
                <tr key={w._id} className="border-b">
                  <td className="px-4 py-2">{w.number}</td>
                  <td className="px-4 py-2 font-mono font-bold">{w.walletId}</td>
                  <td className="px-4 py-2">{w.user?.firstName} {w.user?.lastName} <br /><span className="text-xs text-muted-foreground">{w.user?.email}</span></td>
                  <td className="px-4 py-2">{w.currency}</td>
                  <td className="px-4 py-2">{w.balance}</td>
                  <td className="px-4 py-2">{new Date(w.createdAt).toLocaleString()}</td>
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

export default Wallets;
