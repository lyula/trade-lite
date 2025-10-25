import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, MoreVertical, RefreshCw } from "lucide-react";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

interface AccountCardProps {
  accountNumber: string;
  accountType: string;
  currency: string;
  leverage: string;
  equity: string;
  balance: string;
  margin: string;
  platforms: string[];
}

const AccountCard = ({
  accountNumber,
  accountType,
  currency,
  leverage,
  equity,
  balance,
  margin,
  platforms,
}: AccountCardProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[auto,1fr,auto,auto,auto,auto,auto] md:items-center">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-success/10 text-success">
              {currency}
            </Badge>
            <div>
              <div className="flex items-center gap-2">
                <Copy className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono font-semibold">{accountNumber}</span>
              </div>
              <p className="text-sm text-muted-foreground">{accountType}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:contents">
            <div>
              <p className="text-xs text-muted-foreground">Leverage</p>
              <p className="font-semibold">{leverage}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Equity</p>
              <p className="font-semibold">{equity}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="font-semibold">{balance}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Margin</p>
              <p className="font-semibold">{margin}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge key={platform} variant="outline">
                {platform}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setOpenDeleteModal(true)}>
              <MoreVertical className="h-4 w-4" />
            </Button>
            <DeleteAccountModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              accountNumber={accountNumber}
              accountType={accountType}
              onDelete={async (accNum, accType) => {
                const API_URL = import.meta.env.VITE_BACKEND_URL;
                let endpoint = "";
                let id = accNum;
                if (accType.toLowerCase().includes("live")) {
                  endpoint = `/api/live-accounts/${id}`;
                } else {
                  endpoint = `/api/demo-accounts/${id}`;
                }
                try {
                  const res = await fetch(`${API_URL}${endpoint}`, {
                    method: "DELETE",
                  });
                  const data = await res.json();
                  if (data.success) {
                    window.location.reload();
                  } else {
                    alert(data.error || "Failed to delete account.");
                  }
                } catch (err) {
                  alert("Error deleting account.");
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
