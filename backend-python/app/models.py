from pydantic import BaseModel
from typing import Literal

class StressTestRequest(BaseModel):
    prompt: str

class Mutation(BaseModel):
    mutated: str
    risk: Literal["safe", "risky", "breaks"]
    reason: str

class MutationResults(BaseModel):
    jailbreak: list[Mutation]
    adversarial: list[Mutation]
    typo: list[Mutation]
    edgeCase: list[Mutation]

class Summary(BaseModel):
    total: int
    breaks: int
    risky: int
    safe: int

class StressTestResponse(BaseModel):
    original: str
    results: MutationResults
    summary: Summary
