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
      <label htmlFor="prompt" className="block text-sm font-medium mb-3" style={{ color: '#1a1a1a' }}>
        Enter your prompt to test
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Example: "You are a polite assistant. Only answer questions about Android development."'
        className="input"
        disabled={disabled}
        style={{ minHeight: '140px' }}
      />
      <button
        type="submit"
        disabled={disabled || !prompt.trim()}
        className="btn btn-primary w-full mt-4"
      >
        {disabled ? 'Generating Tests...' : 'Generate Stress Tests'}
      </button>
    </form>
  )
}
