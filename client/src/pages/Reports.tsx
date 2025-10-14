import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your trading reports and statements will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
