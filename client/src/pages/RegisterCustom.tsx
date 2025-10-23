import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import zxcvbn from "zxcvbn";
import { registerUser } from "@/services/userApi";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const RegisterCustom = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [customError, setCustomError] = useState("");
  const [customSuccess, setCustomSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !city ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setCustomError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setCustomError("Passwords do not match.");
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        gender,
        email,
        city,
        phone,
        password,
      };
      await registerUser(userData);
      setCustomSuccess("Registration successful!");
    } catch (error) {
      setCustomError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = zxcvbn(newPassword).score;
    setPasswordStrength(strength);
  };

  const strengthColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-green-700",
  ];

  const CustomToast = ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error";
  }) => (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );

  useEffect(() => {
    if (customError || customSuccess) {
      const timer = setTimeout(() => {
        setCustomError("");
        setCustomSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [customError, customSuccess]);

  useEffect(() => {
    if (customSuccess) {
      const timer = setTimeout(() => {
        setCustomSuccess("");
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [customSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {customError && <CustomToast message={customError} type="error" />}
      {customSuccess && <CustomToast message={customSuccess} type="success" />}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
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
            <label className="block text-sm font-medium">City/Town</label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city or town"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
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
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className={`mt-2 text-sm ${strengthColors[passwordStrength]}`}>
              Password Strength:{" "}
              {["Weak", "Fair", "Good", "Strong", "Very Strong"][passwordStrength]}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              I agree to the {" "}
              <a
                href="/terms"
                className="text-teal-500 hover:underline"
              >
                Terms and Conditions
              </a>.
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterCustom;