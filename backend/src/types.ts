export interface Mutation {
  mutated: string;
  risk: 'safe' | 'risky' | 'breaks';
  reason: string;
}

export interface MutationResults {
  jailbreak: Mutation[];
  adversarial: Mutation[];
  typo: Mutation[];
  edgeCase: Mutation[];
}

export interface MutationCategories {
  jailbreak: string[];
  adversarial: string[];
  typo: string[];
  edgeCase: string[];
}

export interface StressTestResponse {
  original: string;
  results: MutationResults;
  summary: {
    total: number;
    breaks: number;
    risky: number;
    safe: number;
  };
}

export interface EvaluationResult {
  risk: 'safe' | 'risky' | 'breaks';
  reason: string;
}
