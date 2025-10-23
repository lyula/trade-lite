import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Copy } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const Refer = () => {
  const { user } = useUserContext();
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    if (user && user.referralCode) {
      const url = window.location.origin;
      setReferralLink(`${url}/register?ref=${user.referralCode}`);
    }
  }, [user]);

  // Copy to clipboard handler
  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold">Refer a Friend</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Share Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Invite your friends to TradeLite and earn rewards when they start trading.
          </p>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly />
            <Button variant="outline" size="icon" onClick={handleCopy} disabled={!referralLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
              Referral link copied to clipboard!
            </div>
          )}
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Share your unique referral link</li>
              <li>Your friend signs up and verifies their account</li>
              <li>They make their first deposit</li>
              <li>You both receive rewards!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Refer;
