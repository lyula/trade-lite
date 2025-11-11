import { useState } from "react";
import { Loader2 } from "lucide-react";
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/live-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType: selectedAccountType,
          currency: selectedCurrency,
          leverage: "1:400",
          platform,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Account created successfully",
          description: "Your live trading account has been created.",
          duration: 4000,
        });
        window.dispatchEvent(new Event("dashboard-refresh"));
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
    } finally {
      setLoading(false);
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
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Creating Account...
              </>
            ) : (
              "Create Live Account"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddLiveAccount;
