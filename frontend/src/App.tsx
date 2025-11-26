import { useState } from 'react'
import PromptInput from './components/PromptInput'
import CategorySection from './components/CategorySection'
import LoadingScanner from './components/LoadingScanner'
import SparkleIcon from './components/SparkleIcon'
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
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200" style={{ borderBottomWidth: '1px' }}>
        <div className="container-centered py-4">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.02em' }}>
            <span style={{ color: '#1a1a1a' }}>Prompt</span>
            <span style={{ color: '#e85d3c' }}>Test</span>
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-centered py-16">
        {/* Main Card */}
        <div className="card max-w-3xl mx-auto relative" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {/* Decorative Sparkles */}
          <div className="absolute -left-12 top-8 hidden md:block">
            <SparkleIcon size="md" color="#e85d3c" animate />
          </div>
          <div className="absolute -right-10 top-20 hidden md:block">
            <SparkleIcon size="sm" color="#f4a261" animate />
          </div>

          {/* Card Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#1a1a1a', letterSpacing: '-0.02em' }}>
              Prompt-friendly stress testing
            </h2>
            <p className="text-secondary text-base max-w-xl mx-auto">
              Test your prompts against jailbreaks, adversarial attacks, and edge cases.
              Useful for validating any LLM system prompt.
            </p>
          </div>

          {/* Input Form - No wrapper, direct integration */}
          <PromptInput onGenerate={handleGenerate} disabled={loading} />

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <p className="text-red-600 font-medium text-sm">⚠️ {error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8">
              <LoadingScanner />
            </div>
          )}
        </div>

        {/* Results Section - Outside the main card */}
        {results && !loading && (
          <div className="mt-12 animate-fade-in max-w-6xl mx-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="card-white text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                  {results.summary.total}
                </div>
                <div className="text-secondary text-xs font-medium uppercase tracking-wide">Total Tests</div>
              </div>
              <div className="card-white text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: '#dc2626' }}>
                  {results.summary.breaks}
                </div>
                <div className="text-secondary text-xs font-medium uppercase tracking-wide">Breaks</div>
              </div>
              <div className="card-white text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: '#f59e0b' }}>
                  {results.summary.risky}
                </div>
                <div className="text-secondary text-xs font-medium uppercase tracking-wide">Risky</div>
              </div>
              <div className="card-white text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: '#10b981' }}>
                  {results.summary.safe}
                </div>
                <div className="text-secondary text-xs font-medium uppercase tracking-wide">Safe</div>
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
