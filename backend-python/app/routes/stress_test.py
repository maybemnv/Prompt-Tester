from fastapi import APIRouter, HTTPException
from app.models import StressTestRequest, StressTestResponse, MutationResults, Summary
from app.services.mutation_generator import MutationGenerator
from app.services.risk_evaluator import RiskEvaluator

router = APIRouter()
mutation_generator = MutationGenerator()
risk_evaluator = RiskEvaluator()

@router.post("/generate", response_model=StressTestResponse)
async def generate_stress_tests(request: StressTestRequest):
    """Generate stress tests for a prompt"""
    try:
        if not request.prompt or not request.prompt.strip():
            raise HTTPException(status_code=400, detail="Valid prompt is required")

        # Generate mutations
        mutations = mutation_generator.generate_all(request.prompt)

        # Evaluate each mutation
        evaluations = await risk_evaluator.evaluate_all(request.prompt, mutations)

        # Calculate summary
        all_mutations = []
        for category_mutations in evaluations.values():
            all_mutations.extend(category_mutations)

        summary = Summary(
            total=len(all_mutations),
            breaks=sum(1 for m in all_mutations if m["risk"] == "breaks"),
            risky=sum(1 for m in all_mutations if m["risk"] == "risky"),
            safe=sum(1 for m in all_mutations if m["risk"] == "safe"),
        )

        return StressTestResponse(
            original=request.prompt,
            results=MutationResults(**evaluations),
            summary=summary
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate stress tests")
