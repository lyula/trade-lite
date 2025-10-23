import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginCustom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Logging in with", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
        <p className="text-center text-gray-600 mb-6">
          Manage your accounts and access insightful reports and technical analysis among many more features.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-sm text-teal-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
            Continue
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-teal-500 hover:underline">Create Live Account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginCustom;