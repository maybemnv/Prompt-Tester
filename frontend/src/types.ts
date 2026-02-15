// Type definitions for the AI Prompt Stress Tester

export type RiskLevel = "break" | "risky" | "safe";

export interface Mutation {
  id: string;
  text: string;
  risk: RiskLevel;
  reason: string;
}

export interface MutationCategory {
  icon: string;
  title: string;
  mutations: Mutation[];
}

export interface StressTestResult {
  total: number;
  breaks: number;
  risky: number;
  safe: number;
  categories: MutationCategory[];
}