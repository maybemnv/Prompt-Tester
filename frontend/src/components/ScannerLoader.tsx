export function ScannerLoader() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative h-48 rounded-lg border border-border bg-secondary/30 overflow-hidden">
        <div className="absolute inset-x-0 h-8 scanner-line animate-scanner" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-primary animate-pulse-glow">
              Running adversarial stress tests…
            </p>
            <p className="text-xs text-muted-foreground">
              Analyzing 25 mutation vectors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
