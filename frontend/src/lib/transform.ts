import type { StressTestResponse, Mutation } from '@/lib/api';
import type { StressTestResult, MutationCategory, RiskLevel } from '@/types';

/**
 * Maps the API response to the format expected by the UI components
 */
export const mapApiResponseToUiData = (response: StressTestResponse): StressTestResult => {
  // Map risk levels from API format to UI format
  const mapRiskLevel = (apiRisk: 'safe' | 'risky' | 'breaks'): RiskLevel => {
    switch (apiRisk) {
      case 'breaks':
        return 'break';
      case 'risky':
        return 'risky';
      case 'safe':
        return 'safe';
      default:
        return 'safe'; // fallback
    }
  };

  // Transform mutations to UI format
  const transformMutations = (apiMutations: Mutation[], categoryId: string) => {
    return apiMutations.map((mutation, index) => ({
      id: `${categoryId}-${index}`,
      text: mutation.mutated,
      risk: mapRiskLevel(mutation.risk),
      reason: mutation.reason,
    }));
  };

  // Create mutation categories for UI
  const categories: MutationCategory[] = [
    {
      icon: '🔓',
      title: 'Jailbreak Attacks',
      mutations: transformMutations(response.results.jailbreak, 'jailbreak'),
    },
    {
      icon: '🎭',
      title: 'Adversarial Mutations',
      mutations: transformMutations(response.results.adversarial, 'adversarial'),
    },
    {
      icon: '✏️',
      title: 'Typo & Confusables',
      mutations: transformMutations(response.results.typo, 'typo'),
    },
    {
      icon: '🌀',
      title: 'Edge Cases',
      mutations: transformMutations(response.results.edgeCase, 'edgeCase'),
    },
  ];

  return {
    total: response.summary.total,
    breaks: response.summary.breaks,
    risky: response.summary.risky,
    safe: response.summary.safe,
    categories,
  };
};