import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/userApi";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Link } from "react-router-dom";

const LoginCustom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const CustomToast = ({ message }: { message: string }) => (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
      {message}
    </div>
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setCustomError("All fields are required.");
      return;
    }

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user); // Update context immediately
      navigate("/dashboard");
    } catch (error) {
      setCustomError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {customError && <CustomToast message={customError} />}
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
          Don't have an account? <Link to="/register" className="text-teal-500 hover:underline">Create Live Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCustom;