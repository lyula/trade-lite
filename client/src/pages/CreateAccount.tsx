import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Read backend URL from .env
const API_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";

const typeLabels = {
  live: "Live Account",
  demo: "Demo Account",
};


const CreateAccountPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const typeParam = params.get("type") === "demo" ? "demo" : "live";
  const [form, setForm] = useState({
    accountType: "standard",
    currency: typeParam === "demo" ? "USD" : "USD",
    leverage: "1:400",
    platform: typeParam === "live" ? "automated" : "web-based"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let platform = form.platform;
    if (name === "accountType") {
      if (value.startsWith("automated")) {
        platform = "automated";
      } else {
        platform = "web-based";
      }
    }
    setForm({ ...form, [name]: value, platform });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setLoading(true);
      try {
        const endpoint = typeParam === "live"
          ? `${API_URL}/api/live-accounts`
          : `${API_URL}/api/demo-accounts`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            accountType: form.accountType,
            currency: form.currency,
            leverage: form.leverage,
            platform: form.platform
          }),
        });
        const data = await res.json();
        if (data.success) {
          toast({
            title: "Account created successfully",
            description: "Your account has been created.",
            duration: 2000,
          });
          setTimeout(() => {
            window.dispatchEvent(new Event("dashboard-refresh"));
            navigate("/dashboard");
          }, 2000);
        } else {
          alert("Account creation failed: " + (data.error || "Unknown error"));
        }
      } catch (err) {
        alert("Network error: " + err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
  <div className="space-y-6 px-2 sm:px-4 md:px-0 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">Create Account</h1>
  <Card className="w-full max-w-2xl sm:mx-auto">
        <CardHeader>
          <CardTitle>{typeLabels[typeParam]} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Account Type</label>
              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                {typeParam === "live" ? (
                  <>
                    <option value="automated-standard">Automated Standard</option>
                    <option value="automated-pro">Automated Pro</option>
                    <option value="automated-premier">Automated Premier</option>
                  </>
                ) : (
                  <>
                    <option value="standard">Standard</option>
                    <option value="automated-standard">Automated Standard</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Currency</label>
              {typeParam === "demo" ? (
                <input
                  type="text"
                  name="currency"
                  value="USD"
                  readOnly
                  className="w-full border rounded px-3 py-2 text-lg bg-gray-100"
                />
              ) : (
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-lg"
                >
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Leverage</label>
              <select
                name="leverage"
                value={form.leverage}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="1:100">1:100</option>
                <option value="1:200">1:200</option>
                <option value="1:400">1:400</option>
                <option value="1:500">1:500</option>
                <option value="1:1000">1:1000</option>
                <option value="1:2000">1:2000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Platform</label>
              <input
                type="text"
                name="platform"
                value={form.platform === "automated" ? "Automated Environment" : "Web-based"}
                readOnly
                className="w-full border rounded px-3 py-2 text-lg bg-gray-100"
              />
            </div>
            <Button type="submit" className="w-full mt-4 flex items-center justify-center" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                <>Create {typeLabels[typeParam]}</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
