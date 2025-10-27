import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreateWalletPage: React.FC = () => {
  const [form, setForm] = useState({
    currency: "USD",
    password: "",
    confirmPassword: "",
  });
  const { user } = useUserContext();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Remove error state from UI, only use toast
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Wallet creation failed",
        description: "Passwords do not match",
        duration: 4000,
      });
      return;
    }
    if (!user || !user.id) {
      toast({
        title: "Wallet creation failed",
        description: "User not found. Please log in again.",
        duration: 4000,
      });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wallets/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currency: form.currency,
          password: form.password
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Wallet created successfully",
          description: "You will be redirected to your dashboard.",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        let errorMsg = data.error || "Failed to create wallet";
        if (errorMsg.includes("already have a wallet") || errorMsg.includes("Only USD and KES wallets are allowed")) {
          errorMsg = "You are only entitled to two wallets, one in KES and another in USD.";
        }
        toast({
          title: "Wallet creation failed",
          description: errorMsg,
          duration: 4000,
        });
  // Do not set error state, only show toast
      }
    } catch (err) {
      toast({
        title: "Wallet creation failed",
        description: "Network error. Please try again.",
        duration: 4000,
      });
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-0">
      <h1 className="text-3xl font-bold text-center">Create Wallet</h1>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="USD">USD</option>
                <option value="KES">KES</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Wallet Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-lg pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-lg pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* Error removed from UI, only toast is used */}
            <Button type="submit" className="w-full mt-4">Create Wallet</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWalletPage;
