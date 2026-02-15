import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function PromptInput({ value, onChange, onSubmit, loading }: PromptInputProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Prompt-friendly{" "}
          <span className="text-primary">stress testing</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Paste your AI prompt below and discover how it holds up against adversarial attacks, jailbreaks, and edge cases.
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your AI system prompt here…"
        className="min-h-[140px] resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
        disabled={loading}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{value.length} chars</span>
        <Button
          onClick={onSubmit}
          disabled={!value.trim() || loading}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Generate Tests
        </Button>
      </div>
    </div>
  );
}
