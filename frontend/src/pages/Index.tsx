import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { ScannerLoader } from "@/components/ScannerLoader";
import { SummaryBar } from "@/components/SummaryBar";
import { CategorySection } from "@/components/CategorySection";
import { useTheme } from "@/hooks/use-theme";
import { generateStressTests, type StressTestResponse } from "@/lib/api";
import { mapApiResponseToUiData } from "@/lib/transform";
import type { StressTestResult } from "@/types";

const Index = () => {
  const { dark, toggle } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StressTestResult | null>(null);

  const runTest = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResults(null);

    try {
      const response = await generateStressTests({ prompt });
      const transformedResults = mapApiResponseToUiData(response);
      setResults(transformedResults);
    } catch (error) {
      console.error('Error generating stress tests:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
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
