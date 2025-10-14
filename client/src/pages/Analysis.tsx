import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analysis = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analysis</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Market trends and analysis tools will appear here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your trading performance metrics will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
