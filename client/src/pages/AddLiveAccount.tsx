import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const AddLiveAccount = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("manual");
  const [selectedAccountType, setSelectedAccountType] = useState("standard");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleSubmit = () => {
    // Handle account creation logic here
    console.log({
      mode: selectedMode,
      accountType: selectedAccountType,
      currency: selectedCurrency,
    });
    // Navigate back to dashboard after creation
    navigate("/dashboard");
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
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === "manual" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedMode === "manual" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium text-foreground">Manual Trading</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMode("automated")}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedMode === "automated"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === "automated" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedMode === "automated" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="font-medium text-foreground">Automated Trading</span>
                </div>
              </button>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Account Type</h2>
            <div className="space-y-4">
              {/* Standard Account */}
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
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>No minimum deposit</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>Average spreads of 1.4 pips</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>$0 Commission</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Premier Account */}
              <button
                onClick={() => setSelectedAccountType("premier")}
                className={`w-full p-6 rounded-lg border-2 transition ${
                  selectedAccountType === "premier"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                      selectedAccountType === "premier" ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedAccountType === "premier" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                          <span className="text-white text-sm">👑</span>
                        </div>
                        <span className="font-semibold text-foreground">Premier</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>Deposits from $100</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>Spreads from 0.0 pips</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>$7/lot commission</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Currency Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Currency</h2>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedCurrency("USD")}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  selectedCurrency === "USD"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs">🇺🇸</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">USD</div>
                      <div className="text-sm text-muted-foreground">US Dollar</div>
                    </div>
                  </div>
                  {selectedCurrency === "USD" && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setSelectedCurrency("KES")}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  selectedCurrency === "KES"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white text-xs">🇰🇪</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">KES</div>
                      <div className="text-sm text-muted-foreground">Kenyan Shilling</div>
                    </div>
                  </div>
                  {selectedCurrency === "KES" && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            </div>
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
