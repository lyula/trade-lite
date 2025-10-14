import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDownToLine, CreditCard } from "lucide-react";
import mpesaLogo from "@/assets/m-pesa-logo.jpg";
import payheroLogo from "@/assets/payhero-logo.png";
import payaLogo from "@/assets/paya-logo.png";

const Deposits = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deposits</h1>
        <Link to="/dashboard/deposit-to-account">
          <Button className="gap-2">
            <ArrowDownToLine className="h-4 w-4" />
            New Deposit
          </Button>
        </Link>
      </div>

      {/* Payment Logos Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-start items-center justify-center gap-10 py-8">
        <div className="flex flex-col items-center gap-2">
          <img src={mpesaLogo} alt="M-Pesa" className="h-16 w-16 rounded-full object-cover" />
          <span className="text-sm font-medium text-muted-foreground">M-Pesa</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={payheroLogo} alt="PayHero" className="h-16 w-16 rounded-full object-cover" />
          <span className="text-sm font-medium text-muted-foreground">PayHero</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={payaLogo} alt="Paya" className="h-16 w-16 rounded-full object-cover" />
          <span className="text-sm font-medium text-muted-foreground">Paya</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Card</span>
        </div>
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
