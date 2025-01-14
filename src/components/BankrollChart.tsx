import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

const generateStaticData = () => {
  const startAmount = 10000;
  const endAmount = 13547;
  const days = 3;
  const pointsPer2Hours = 1;
  const totalPoints = (days * 24 / 2) * pointsPer2Hours;
  
  const data = [];
  const totalIncrease = endAmount - startAmount;
  
  for (let i = 0; i < totalPoints; i++) {
    const date = new Date(2025, 0, 11);
    date.setHours(i * 2);
    
    const progress = i / (totalPoints - 1);
    const baseValue = startAmount + (totalIncrease * progress);
    const variation = Math.random() * 500 - 250;
    
    data.push({
      timestamp: date.getTime(),
      value: Math.round(baseValue + variation)
    });
  }
  
  return data;
};

const BankrollChart = () => {
  const data = generateStaticData();

  return (
    <Card className="glass-card p-6 h-[300px] animate-in">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getHours()}:00`;
            }}
            interval={0}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={[9000, 14000]}
            ticks={[9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const date = new Date(payload[0].payload.timestamp);
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Time
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {date.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Bankroll
                        </span>
                        <span className="font-bold">
                          ${payload[0].value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BankrollChart;