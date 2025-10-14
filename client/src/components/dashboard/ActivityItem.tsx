import { Badge } from "@/components/ui/badge";

interface ActivityItemProps {
  date: string;
  description: string;
  accountNumber?: string;
  status: "Accepted" | "Pending" | "Rejected";
}

const ActivityItem = ({ date, description, accountNumber, status }: ActivityItemProps) => {
  const statusColors = {
    Accepted: "bg-success/10 text-success border-success/20",
    Pending: "bg-warning/10 text-warning border-warning/20",
    Rejected: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="flex flex-col gap-2 border-b py-4 last:border-0 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
        <span className="text-sm text-muted-foreground">{date}</span>
        <span className="text-sm">
          {description}
          {accountNumber && (
            <span className="ml-1 font-semibold text-primary">{accountNumber}</span>
          )}
        </span>
      </div>
      <Badge variant="outline" className={statusColors[status]}>
        {status}
      </Badge>
    </div>
  );
};

export default ActivityItem;
