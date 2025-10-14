import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Platforms = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trading Platforms</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>MT5</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              MetaTrader 5 is a multi-asset platform that allows trading Forex, stocks and futures.
            </p>
            <Button className="w-full">Download MT5</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WebTrader</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Access your trading account directly from your web browser.
            </p>
            <Button className="w-full">Launch WebTrader</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Trade on the go with our mobile trading application.
            </p>
            <Button className="w-full">Get Mobile App</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Platforms;
