import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";

const Deposits = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deposits</h1>
        <Button className="gap-2">
          <ArrowDownToLine className="h-4 w-4" />
          New Deposit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your deposit history will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deposits;
