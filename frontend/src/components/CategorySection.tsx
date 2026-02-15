import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import type { RiskLevel, MutationCategory } from "@/types";

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  break: { label: "Break", className: "bg-destructive text-destructive-foreground" },
  risky: { label: "Risky", className: "bg-warning text-warning-foreground" },
  safe: { label: "Safe", className: "bg-success text-success-foreground" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={copy} aria-label="Copy mutation">
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  );
}

export function CategorySection({ icon, title, mutations }: MutationCategory) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-2xl mx-auto">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
        <span className="flex items-center gap-2 font-semibold text-sm">
          <span>{icon}</span>
          {title}
          <span className="text-muted-foreground font-normal">({mutations.length})</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2 mt-2">
        {mutations.map((m, i) => {
          const rc = riskConfig[m.risk];
          return (
            <Card
              key={m.id}
              className="p-4 space-y-2 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <Badge className={rc.className}>{rc.label}</Badge>
                <CopyButton text={m.text} />
              </div>
              <pre className="text-xs bg-secondary/60 rounded p-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-foreground">
                {m.text || "(empty)"}
              </pre>
              <p className="text-xs text-muted-foreground">{m.reason}</p>
            </Card>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
