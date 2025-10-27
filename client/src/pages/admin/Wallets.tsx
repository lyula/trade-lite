import React from "react";

import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";


import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  // Start on the last page by default (newest records)
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
      let fetchPage = page;
      // If total is not known, fetch page 1 to get total
      if (total === 0) fetchPage = 1;
      const res = await fetch(`${API_URL}/api/wallets/all?page=${fetchPage}&limit=${limit}&prefetch=10`);
      const data = await res.json();
      if (data.success) {
        let cache = { ...pageCache };
        // Oldest records first
        const allWallets = [...data.wallets];
        // If total is not set, set it and jump to last page
        if (total === 0 && data.total) {
          setTotal(data.total);
          const lastPage = Math.ceil(data.total / limit) || 1;
          setPage(lastPage);
          // Don't set cache/wallets yet, will refetch on next render
          setLoading(false);
          return;
        }
        // Cache all pages in the prefetch range
        let totalPages = Math.ceil(total / limit) || 1;
        let prefetchStart = Math.max(1, fetchPage - 10);
        let prefetchEnd = Math.min(totalPages, fetchPage + 10);
        for (let p = prefetchStart; p <= prefetchEnd; p++) {
          const startIdx = (p - 1) * limit;
          cache[p] = allWallets.slice(startIdx, startIdx + limit);
        }
        setPageCache(cache);
        setWallets(cache[page] || []);
        setTotal(data.total);
        // Calculate total balance for all records
        const totalBalance = allWallets.reduce((sum, w) => sum + (parseFloat(w.balance) || 0), 0);
        setTotalBalance(totalBalance);
      }
      setLoading(false);
    }
    fetchWallets();
    // eslint-disable-next-line
  }, [page, limit, total]);

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Wallets</h1>
      <div className="mb-4 text-lg font-semibold">Total Balance (All Wallets): <span className="text-primary">KES {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
      <div className="w-full">
        <div className="rounded-lg overflow-x-auto border bg-white">
          {loading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : (
            <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Wallet ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Currency</th>
                {/* <th className="px-4 py-2 text-left">Balance</th> */}
                <th className="px-4 py-2 text-left">USD Balance</th>
                <th className="px-4 py-2 text-left">KES Balance</th>
                <th className="px-4 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((w, idx) => (
                <tr key={w._id} className="border-b">
                  <td className="px-4 py-2 text-left">{total - ((page - 1) * limit + idx)}</td>
                  <td className="px-4 py-2 font-mono font-bold text-left">{w.walletId}</td>
                  <td className="px-4 py-2 text-left">{w.user?.firstName} {w.user?.lastName} <br /><span className="text-xs text-muted-foreground">{w.user?.email}</span></td>
                  <td className="px-4 py-2 text-left">{w.currency}</td>
                  {/* <td className="px-4 py-2 text-left">{w.balance}</td> */}
                  <td className="px-4 py-2 text-left">{w.usdBalance !== undefined ? w.usdBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</td>
                  <td className="px-4 py-2 text-left">{w.kesBalance !== undefined ? w.kesBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</td>
                  <td className="px-4 py-2 text-left">{new Date(w.createdAt).toLocaleString()}</td>
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
            disabled={page >= Math.ceil(total / limit)}
          >Next</button>
        </div>
      </div>
    </div>
    </AdminDashboardLayout>
  );
};

export default Wallets;
