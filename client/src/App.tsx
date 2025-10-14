import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
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
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
