import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const AddWalletAccount = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle wallet account creation logic here
    console.log({ currency: selectedCurrency, password });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create a new wallet account</h1>
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Currency</label>
              <select
                value={selectedCurrency}
                onChange={e => setSelectedCurrency(e.target.value)}
                className="w-full border rounded px-3 py-2 text-lg"
              >
                <option value="USD">USD</option>
                <option value="KES">KES</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-2 text-foreground">Portal password</label>
              <span className="block text-sm text-muted-foreground mb-2">For added security we require you to confirm your Portal password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-lg pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-lg py-2 rounded">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddWalletAccount;
