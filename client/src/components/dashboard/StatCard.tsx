import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard = ({ title, value, subtitle, icon: Icon, iconColor = "text-muted-foreground" }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-start justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`rounded-full bg-muted p-3 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
