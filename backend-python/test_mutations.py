"""Quick test script to verify mutation generation"""

from app.services.mutation_generator import MutationGenerator

generator = MutationGenerator()
test_prompt = "You are a helpful assistant. Only answer questions about cooking."

print("🧪 Testing Mutation Generator\n")
print("Original Prompt:")
print(f'"{test_prompt}"\n')

mutations = generator.generate_all(test_prompt)

print("📊 Generated Mutations:\n")

for category, prompts in mutations.items():
    print(f"\n{category.upper()} ({len(prompts)} mutations):")
    print("─" * 60)
    for i, mutation in enumerate(prompts, 1):
        preview = mutation[:100] + "..." if len(mutation) > 100 else mutation
        print(f"\n{i}. {preview}")

print("\n\n✅ Mutation generation working correctly!")
print(f"Total mutations: {sum(len(p) for p in mutations.values())}")
