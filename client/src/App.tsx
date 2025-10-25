import CreateWallet from "./pages/CreateWallet";
import CreateAccount from "./pages/CreateAccount";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginCustom from "./pages/LoginCustom";
import RegisterCustom from "./pages/RegisterCustom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminWallets from "./pages/admin/Wallets";
import AdminDemoAccounts from "./pages/admin/DemoAccounts";
import AdminLiveAccounts from "./pages/admin/LiveAccounts";
import AdminDeposits from "./pages/admin/Deposits";
import AdminWithdrawals from "./pages/admin/Withdrawals";
import Admins from "./pages/admin/Admins";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Deposits from "./pages/Deposits";
import Withdrawals from "./pages/Withdrawals";
import Transfers from "./pages/Transfers";
import Reports from "./pages/Reports";
import Analysis from "./pages/Analysis";
import Automation from "./pages/Automation";
import Markets from "./pages/Markets";
import Platforms from "./pages/Platforms";
import Refer from "./pages/Refer";
import SSOCallback from "./pages/SSOCallback";
import ProtectedRoute from "@/components/ProtectedRoute";
import Profile from "./pages/Profile"; // Import the Profile component
import WithdrawFromAccount from "./pages/WithdrawFromAccount";
import TermsAndConditions from "./pages/TermsAndConditions";
import { UserProvider } from "@/context/UserContext";

import AddLiveAccount from "./pages/AddLiveAccount";
import AddDemoAccount from "./pages/AddDemoAccount";
import AddWalletAccount from "./pages/AddWalletAccount";
import DepositToAccount from "./pages/DepositToAccount";
import LegalTerms from "./pages/LegalTerms";
import TransferFunds from "./pages/TransferFunds";

const queryClient = new QueryClient();

const App = () => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginCustom />} />
            <Route path="/register" element={<RegisterCustom />} />
            <Route path="/login/sso-callback" element={<SSOCallback />} />
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/wallets" element={<AdminWallets />} />
            <Route path="/admin/demo-accounts" element={<AdminDemoAccounts />} />
            <Route path="/admin/live-accounts" element={<AdminLiveAccounts />} />
            <Route path="/admin/deposits" element={<AdminDeposits />} />
            <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
            <Route path="/admin/admins" element={<Admins />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="withdrawals" element={<Withdrawals />} />
              <Route path="transfers" element={<Transfers />} />
              <Route path="reports" element={<Reports />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="automation" element={<Automation />} />
              <Route path="markets" element={<Markets />} />
              <Route path="platforms" element={<Platforms />} />
              <Route path="refer" element={<Refer />} />
              <Route path="profile" element={<Profile />} /> {/* Add the Profile route */}
              <Route path="add-live-account" element={<AddLiveAccount />} />
              <Route path="add-demo-account" element={<AddDemoAccount />} />
              <Route path="add-wallet-account" element={<AddWalletAccount />} />
              <Route path="deposit-to-account" element={<DepositToAccount />} />
              <Route path="legal" element={<LegalTerms />} />
              <Route path="transfer-funds" element={<TransferFunds />} />
              <Route path="withdraw-from-account" element={<WithdrawFromAccount />} />
              <Route path="create-account" element={<CreateAccount />} />
              <Route path="create-wallet" element={<CreateWallet />} />
            </Route>
            <Route path="/terms" element={<TermsAndConditions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </UserProvider>
);

export default App;
