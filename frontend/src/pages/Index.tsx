import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { ScannerLoader } from "@/components/ScannerLoader";
import { SummaryBar } from "@/components/SummaryBar";
import { CategorySection } from "@/components/CategorySection";
import { useTheme } from "@/hooks/use-theme";
import { generateMockResults, type StressTestResult } from "@/lib/mock-data";

const Index = () => {
  const { dark, toggle } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StressTestResult | null>(null);

  const runTest = () => {
    setLoading(true);
    setResults(null);
    const delay = 2000 + Math.random() * 1000;
    setTimeout(() => {
      setResults(generateMockResults(prompt));
      setLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header dark={dark} onToggle={toggle} />

      <main className="flex-1 flex flex-col items-center px-4 py-10 gap-8">
        <PromptInput value={prompt} onChange={setPrompt} onSubmit={runTest} loading={loading} />

        {loading && <ScannerLoader />}

        {results && !loading && (
          <div className="w-full flex flex-col items-center gap-6 opacity-0 animate-fade-in">
            <SummaryBar
              total={results.total}
              breaks={results.breaks}
              risky={results.risky}
              safe={results.safe}
            />

            {results.categories.map((cat) => (
              <CategorySection key={cat.title} {...cat} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
