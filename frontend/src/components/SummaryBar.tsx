import { Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SummaryBarProps {
  total: number;
  breaks: number;
  risky: number;
  safe: number;
}

const stats = [
  { key: "total", label: "Total Tests", icon: FileText, color: "text-foreground" },
  { key: "breaks", label: "Breaks", icon: Shield, color: "text-destructive" },
  { key: "risky", label: "Risky", icon: AlertTriangle, color: "text-warning" },
  { key: "safe", label: "Safe", icon: CheckCircle, color: "text-success" },
] as const;

export function SummaryBar({ total, breaks, risky, safe }: SummaryBarProps) {
  const values = { total, breaks, risky, safe };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mx-auto">
      {stats.map((s) => (
        <Card key={s.key} className="flex items-center gap-3 p-4">
          <s.icon className={`h-5 w-5 shrink-0 ${s.color}`} />
          <div>
            <p className="text-2xl font-bold">{values[s.key]}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
