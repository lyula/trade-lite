import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminRegister } from "@/services/adminApi";
import { toast } from "@/hooks/use-toast";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      await adminRegister(email, password);
      toast({
        title: "Registration Successful",
        description: "Admin account created successfully. Redirecting to login...",
        variant: "default",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/admin/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast({
        title: "Registration Error",
        description: err.message || "Registration failed",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Register</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded pr-10"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full px-3 py-2 border rounded pr-10"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition flex items-center justify-center" disabled={loading}>
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <button type="button" className="text-primary underline" onClick={() => navigate("/admin/login")}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
