import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    currency: "USD",
    leverage: "1:400",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle account creation logic here
    navigate("/dashboard");
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
                <option value="standard">Standard</option>
                <option value="pro">Pro</option>
                {typeParam === "live" && <option value="premier">Premier</option>}
              </select>
            </div>
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
            <Button type="submit" className="w-full mt-4">Create {typeLabels[typeParam]}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
