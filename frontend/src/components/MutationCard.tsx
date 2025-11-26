import { useState } from 'react'
import type { Mutation } from '../types'

interface MutationCardProps {
  mutation: Mutation
}

export default function MutationCard({ mutation }: MutationCardProps) {
  const [copied, setCopied] = useState(false)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'breaks':
        return 'border-red-500/50 bg-red-500/5'
      case 'risky':
        return 'border-yellow-500/50 bg-yellow-500/5'
      case 'safe':
        return 'border-green-500/50 bg-green-500/5'
      default:
        return 'border-slate-700 bg-slate-800/50'
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'breaks':
        return <span className="text-red-400 font-semibold">🔴 BREAKS</span>
      case 'risky':
        return <span className="text-yellow-400 font-semibold">🟡 RISKY</span>
      case 'safe':
        return <span className="text-green-400 font-semibold">🟢 SAFE</span>
      default:
        return <span className="text-slate-400">UNKNOWN</span>
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mutation.mutated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`border rounded-lg p-4 ${getRiskColor(mutation.risk)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm">{getRiskBadge(mutation.risk)}</div>
        <button
          onClick={handleCopy}
          className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      
      <div className="bg-slate-900/50 rounded p-3 mb-3">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap break-words font-mono">
          {mutation.mutated || '(empty)'}
        </pre>
      </div>
      
      <div className="text-xs text-slate-400 italic">
        {mutation.reason}
      </div>
    </div>
  )
}
