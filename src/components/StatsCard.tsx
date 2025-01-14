import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  prefix = "", 
  suffix = ""
}: StatsCardProps) => {
  return (
    <Card className="stat-card animate-in">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-mono font-bold">
        {prefix}{value}{suffix}
      </p>
    </Card>
  );
};

export default StatsCard;