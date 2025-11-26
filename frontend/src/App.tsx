import { useState } from 'react'
import PromptInput from './components/PromptInput'
import CategorySection from './components/CategorySection'
import LoadingScanner from './components/LoadingScanner'
import { generateStressTests } from './utils/api'
import type { StressTestResults } from './types'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<StressTestResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (prompt: string) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await generateStressTests(prompt)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate tests')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            ⚡ AI Prompt Stress Tester
          </h1>
          <p className="text-slate-400 text-lg">
            Test your prompts against jailbreaks, adversarial attacks, and edge cases
          </p>
        </div>

        {/* Input Section */}
        <PromptInput onGenerate={handleGenerate} disabled={loading} />

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingScanner />}

        {/* Results */}
        {results && !loading && (
          <div className="mt-12">
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{results.summary.total}</div>
                <div className="text-slate-400 text-sm">Total Tests</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-400">{results.summary.breaks}</div>
                <div className="text-slate-400 text-sm">Breaks</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{results.summary.risky}</div>
                <div className="text-slate-400 text-sm">Risky</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">{results.summary.safe}</div>
                <div className="text-slate-400 text-sm">Safe</div>
              </div>
            </div>

            {/* Categories */}
            <CategorySection
              title="🔓 Jailbreak Attacks"
              description="Attempts to override instructions and break role constraints"
              mutations={results.results.jailbreak}
            />
            <CategorySection
              title="🎭 Adversarial Mutations"
              description="Unicode tricks, hidden injections, and nested instructions"
              mutations={results.results.adversarial}
            />
            <CategorySection
              title="✏️ Typo & Confusables"
              description="Character swaps and parsing confusion attempts"
              mutations={results.results.typo}
            />
            <CategorySection
              title="🌀 Edge Cases"
              description="Boundary testing with empty, reversed, and flooded inputs"
              mutations={results.results.edgeCase}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
