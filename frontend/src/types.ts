export interface Mutation {
  mutated: string
  risk: 'safe' | 'risky' | 'breaks'
  reason: string
}

export interface StressTestResults {
  original: string
  results: {
    jailbreak: Mutation[]
    adversarial: Mutation[]
    typo: Mutation[]
    edgeCase: Mutation[]
  }
  summary: {
    total: number
    breaks: number
    risky: number
    safe: number
  }
}
