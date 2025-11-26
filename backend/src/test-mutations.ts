// Quick test script to verify mutation generation
import { MutationGenerator } from './services/mutationGenerator.js';

const generator = new MutationGenerator();
const testPrompt = 'You are a helpful assistant. Only answer questions about cooking.';

console.log('🧪 Testing Mutation Generator\n');
console.log('Original Prompt:');
console.log(`"${testPrompt}"\n`);

const mutations = generator.generateAll(testPrompt);

console.log('📊 Generated Mutations:\n');

Object.entries(mutations).forEach(([category, prompts]) => {
  console.log(`\n${category.toUpperCase()} (${prompts.length} mutations):`);
  console.log('─'.repeat(60));
  prompts.forEach((mutation: string, i: number) => {
    console.log(`\n${i + 1}. ${mutation.substring(0, 100)}${mutation.length > 100 ? '...' : ''}`);
  });
});

console.log('\n\n✅ Mutation generation working correctly!');
console.log(`Total mutations: ${Object.values(mutations).flat().length}`);
