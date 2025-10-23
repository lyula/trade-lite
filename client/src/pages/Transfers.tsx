import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Transfers = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transfers</h1>
        <Button className="gap-2" onClick={() => navigate("/dashboard/transfer-funds")}>
          <ArrowLeftRight className="h-4 w-4" />
          New Transfer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your transfer history will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transfers;
