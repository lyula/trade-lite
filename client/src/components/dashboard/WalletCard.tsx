import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WalletCardProps {
  currency: string;
  accountNumber: string;
  balance: string;
  currencyColor?: string;
}

const WalletCard = ({ currency, accountNumber, balance, currencyColor = "success" }: WalletCardProps) => {
  const badgeClass = currencyColor === "warning"
    ? "bg-warning/10 text-warning border-warning/20"
    : "bg-success/10 text-success border-success/20";
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={badgeClass}>
              {currency}
            </Badge>
            <span className="font-mono font-semibold text-primary">{accountNumber}</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="text-xl font-bold">{balance}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/dashboard/deposits") }>
                <ArrowDownToLine className="h-4 w-4" />
                Deposit
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/dashboard/transfer-funds") }>
                <ArrowLeftRight className="h-4 w-4" />
                Transfer
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/dashboard/withdraw-from-account") }>
                <ArrowUpFromLine className="h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
