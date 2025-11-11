import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/userApi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { Link } from "react-router-dom";

const LoginCustom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const CustomToast = ({ message }: { message: string }) => (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
      {message}
    </div>
  );

  // Hide error toast after 3 seconds
  useEffect(() => {
    if (customError) {
      const timer = setTimeout(() => setCustomError("") , 3000);
      return () => clearTimeout(timer);
    }
  }, [customError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setCustomError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      // Check if email exists
      const existsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users?email=${encodeURIComponent(email)}`);
      if (!existsRes.data || existsRes.data.exists !== true) {
        setCustomError("Account does not exist.");
        setLoading(false);
        return;
      }
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
    setLoading(false);
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-teal-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Continue"
            )}
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