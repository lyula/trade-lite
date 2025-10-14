import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine } from "lucide-react";

const Withdrawals = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Withdrawals</h1>
        <Button className="gap-2">
          <ArrowUpFromLine className="h-4 w-4" />
          New Withdrawal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your withdrawal history will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawals;
