import { useState } from 'react'

interface PromptInputProps {
  onGenerate: (prompt: string) => void
  disabled?: boolean
}

export default function PromptInput({ onGenerate, disabled }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onGenerate(prompt.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <label htmlFor="prompt" className="block text-slate-300 text-sm font-medium mb-3">
          Enter your prompt to test
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Example: "You are a polite assistant. Only answer questions about Android development."'
          className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {disabled ? 'Generating...' : '⚡ Generate Stress Tests'}
        </button>
      </div>
    </form>
  )
}
