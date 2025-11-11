import React, { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const strength = zxcvbn(value).score;
    setPasswordStrength(strength);
  };

  const strengthColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-green-700",
  ];

  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (newPassword !== confirmPassword) {
      toast({ 
        title: "Password mismatch", 
        description: "Passwords do not match. Please try again.", 
        duration: 4000 
      });
      return;
    }

    // Validate password strength
    if (passwordStrength < 2) {
      toast({ 
        title: "Weak password", 
        description: "Please choose a stronger password.", 
        duration: 4000 
      });
      return;
    }

    setLoading(true);
    try {
      const otpCode = otp.join("");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Password reset successful", description: "You can now log in.", duration: 4000 });
        navigate("/login");
      } else {
        toast({ title: "Error", description: data.error || "Failed to reset password.", duration: 4000 });
      }
    } catch (err) {
      toast({ title: "Network error", description: String(err), duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast({ 
        title: "Error", 
        description: "Email not found. Please go back to forgot password page.", 
        duration: 4000 
      });
      return;
    }

    setResendingOtp(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/password/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        toast({ 
          title: "OTP Resent", 
          description: "A new OTP has been sent to your email.", 
          duration: 4000 
        });
        // Clear existing OTP inputs
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
      } else {
        toast({ 
          title: "Error", 
          description: data.error || "Failed to resend OTP.", 
          duration: 4000 
        });
      }
    } catch (err) {
      toast({ 
        title: "Network error", 
        description: "Failed to resend OTP. Please try again.", 
        duration: 4000 
      });
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-center w-full">Enter OTP</label>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border-2 rounded-lg text-lg font-semibold focus:border-teal-500 focus:outline-none"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                required
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-2 text-teal-500 hover:underline text-sm"
            onClick={handleResendOtp}
            disabled={resendingOtp}
          >
            {resendingOtp ? "Resending OTP..." : "Resend OTP"}
          </button>
        </div>
        
        {/* New Password field */}
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-3 py-2 pr-10"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {newPassword && (
            <p className={`text-sm mt-1 ${strengthColors[passwordStrength]}`}>
              Password strength: {strengthLabels[passwordStrength]}
            </p>
          )}
        </div>

        {/* Confirm Password field */}
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border rounded px-3 py-2 pr-10"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
