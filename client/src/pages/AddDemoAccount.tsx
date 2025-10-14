
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddDemoAccount = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("demo");
  const [selectedAccountType, setSelectedAccountType] = useState("standard");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleSubmit = () => {
    // Handle demo account creation logic here
    console.log({
      mode: selectedMode,
      accountType: selectedAccountType,
      currency: selectedCurrency,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create new DEMO account</h1>
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
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setSelectedMode("demo")}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedMode === "demo"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === "demo" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedMode === "demo" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium text-foreground">Demo Trading</span>
                </div>
              </button>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Account Type</h2>
            <div className="space-y-4">
              <button
                onClick={() => setSelectedAccountType("standard")}
                className={`w-full p-6 rounded-lg border-2 transition ${
                  selectedAccountType === "standard"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                      selectedAccountType === "standard" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedAccountType === "standard" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                          <span className="text-white text-sm">📊</span>
                        </div>
                        <span className="font-semibold text-foreground">Standard</span>
                      </div>
                      <span className="text-muted-foreground text-xs">For most users, low spreads</span>
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setSelectedAccountType("pro")}
                className={`w-full p-6 rounded-lg border-2 transition ${
                  selectedAccountType === "pro"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                      selectedAccountType === "pro" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedAccountType === "pro" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-white text-sm">💼</span>
                        </div>
                        <span className="font-semibold text-foreground">Pro</span>
                      </div>
                      <span className="text-muted-foreground text-xs">For advanced users, zero commission</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Currency Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Currency</h2>
            <div className="grid grid-cols-3 gap-4">
              {['USD', 'KES', 'GBP'].map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`p-4 rounded-lg border-2 transition ${
                    selectedCurrency === currency
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium text-foreground">{currency}</span>
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Create Demo Account
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddDemoAccount;
