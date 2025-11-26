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
        return 'border-red-200 bg-red-50'
      case 'risky':
        return 'border-yellow-200 bg-yellow-50'
      case 'safe':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'breaks':
        return <span className="badge badge-danger">🔴 BREAKS</span>
      case 'risky':
        return <span className="badge badge-warning">🟡 RISKY</span>
      case 'safe':
        return <span className="badge badge-success">🟢 SAFE</span>
      default:
        return <span className="text-muted text-sm font-semibold">UNKNOWN</span>
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mutation.mutated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`border-2 rounded-lg p-4 transition-all ${getRiskColor(mutation.risk)}`}>
      <div className="flex justify-between items-start mb-3">
        <div>{getRiskBadge(mutation.risk)}</div>
        <button
          onClick={handleCopy}
          className="btn-secondary text-xs px-3 py-1.5"
          style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      
      <div 
        className="rounded p-3 mb-3" 
        style={{ backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <pre className="text-sm whitespace-pre-wrap break-words font-mono" style={{ color: '#1a1a1a', margin: 0 }}>
          {mutation.mutated || '(empty)'}
        </pre>
      </div>
      
      <div className="text-xs text-secondary italic">
        {mutation.reason}
      </div>
    </div>
  )
}
