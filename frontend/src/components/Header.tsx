import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  dark: boolean;
  onToggle: () => void;
}

export function Header({ dark, onToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-xl font-bold tracking-tight">
          <span className="text-muted-foreground">Prompt</span>
          <span className="text-primary">Test</span>
        </span>
      </div>
      <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle theme">
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
}
