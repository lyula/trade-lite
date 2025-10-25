import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";


const API_URL = import.meta.env.VITE_BACKEND_URL;
const AddLiveAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState("manual");
  const [selectedAccountType, setSelectedAccountType] = useState("standard");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [platform, setPlatform] = useState("web-based");

  const handleSubmit = async () => {
    // Replace with actual API call
    try {
      const res = await fetch(`${API_URL}/api/live-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Add required fields here, e.g. userId, accountType, currency, leverage
          accountType: selectedAccountType,
          currency: selectedCurrency,
          leverage: "1:400", // or get from state if needed
          platform,
          // userId: ... (get from context if needed)
        }),
      });
          {/* Platform Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Platform</h2>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
              className="w-full border rounded px-2 py-2"
            >
              <option value="web-based">Web-based</option>
              <option value="automated">Automated Environment</option>
            </select>
          </div>
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Account created successfully",
          description: "Your live trading account has been created.",
          duration: 4000,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Account creation failed",
          description: data.error || "Unknown error",
          duration: 4000,
        });
      }
    } catch (err) {
      toast({
        title: "Network error",
        description: String(err),
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create new LIVE account</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="p-8">
          {/* Mode Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Mode</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedMode("manual")}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedMode === "manual"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Manual Trading
              </button>
              <button
                onClick={() => setSelectedMode("automated")}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedMode === "automated"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Automated Trading
              </button>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Account Type</h2>
            <select
              value={selectedAccountType}
              onChange={e => setSelectedAccountType(e.target.value)}
              className="w-full border rounded px-2 py-2"
            >
              <option value="standard">Standard</option>
              <option value="pro">Pro</option>
              <option value="premier">Premier</option>
              <option value="automated-standard">Automated Standard</option>
              <option value="automated-pro">Automated Pro</option>
              <option value="automated-premier">Automated Premier</option>
            </select>
          </div>

          {/* Currency Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Currency</h2>
            <select
              value={selectedCurrency}
              onChange={e => setSelectedCurrency(e.target.value)}
              className="w-full border rounded px-2 py-2"
            >
              <option value="USD">USD</option>
              <option value="KES">KES</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6"
          >
            Create Live Account
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddLiveAccount;
