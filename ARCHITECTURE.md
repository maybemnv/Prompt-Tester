# 🏗️ Architecture Documentation

## System Overview

The AI Prompt Stress Tester is a full-stack application that generates adversarial variations of AI prompts and evaluates their risk level using AWS Bedrock's Claude Haiku model.

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **AWS SDK** - Bedrock integration
- **ES Modules** - Modern JavaScript

### AI/ML
- **AWS Bedrock** - Managed AI service
- **Claude 3 Haiku** - Fast, cost-effective LLM

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ PromptInput  │  │CategorySection│  │MutationCard  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                         │                                │
│                    ┌────▼────┐                          │
│                    │ api.ts  │                          │
│                    └────┬────┘                          │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTP POST
                          │ /api/stress-test/generate
┌─────────────────────────▼───────────────────────────────┐
│                   Backend (Express)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │         routes/stressTest.js                      │  │
│  │  - Receives prompt                                │  │
│  │  - Orchestrates generation & evaluation          │  │
│  └────────┬─────────────────────────┬─────────────────┘ │
│           │                         │                    │
│  ┌────────▼────────┐      ┌────────▼────────┐          │
│  │ mutationGenerator│      │  riskEvaluator  │          │
│  │                 │      │                 │          │
│  │ - Jailbreaks    │      │ - AI Evaluation │          │
│  │ - Adversarial   │      │ - Heuristics    │          │
│  │ - Typos         │      │                 │          │
│  │ - Edge Cases    │      │                 │          │
│  └─────────────────┘      └────────┬────────┘          │
└────────────────────────────────────┼────────────────────┘
                                     │ AWS SDK
                                     │
┌────────────────────────────────────▼────────────────────┐
│                    AWS Bedrock                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Claude 3 Haiku                                   │  │
│  │  - Analyzes mutation vs original                 │  │
│  │  - Returns: SAFE | RISKY | BREAKS                │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Request Flow

```
User Input → PromptInput Component
    ↓
API Call (POST /api/stress-test/generate)
    ↓
Express Route Handler
    ↓
MutationGenerator.generateAll()
    ↓
25 mutations created (7+6+5+7)
    ↓
RiskEvaluator.evaluateAll()
    ↓
For each mutation:
    - Call Bedrock API
    - Parse response
    - Classify risk
    ↓
Return results to frontend
    ↓
Render in CategorySections
```

### 2. Mutation Generation

```javascript
generateAll(prompt) {
  return {
    jailbreak: [
      // 7 variations that try to override instructions
    ],
    adversarial: [
      // 6 variations with unicode/injection tricks
    ],
    typo: [
      // 5 variations with character manipulation
    ],
    edgeCase: [
      // 7 variations testing boundaries
    ]
  }
}
```

### 3. Risk Evaluation

```javascript
async evaluateMutation(original, mutated) {
  try {
    // Primary: AI evaluation via Bedrock
    const response = await bedrock.invokeModel({
      model: "claude-3-haiku",
      prompt: `Evaluate if mutation breaks original...`
    })
    return parseRisk(response)
  } catch (error) {
    // Fallback: Heuristic evaluation
    return heuristicEvaluation(mutated)
  }
}
```

## Component Structure

### Frontend Components

```
src/
├── App.tsx                    # Main app, state management
├── components/
│   ├── PromptInput.tsx       # Text input + submit button
│   ├── LoadingScanner.tsx    # Animated loading state
│   ├── CategorySection.tsx   # Groups mutations by type
│   └── MutationCard.tsx      # Individual mutation display
├── utils/
│   └── api.ts                # Axios HTTP client
└── types.ts                  # TypeScript interfaces
```

### Backend Services

```
backend/
├── server.js                 # Express app setup
├── routes/
│   └── stressTest.js        # API endpoints
└── services/
    ├── mutationGenerator.js  # Mutation logic
    └── riskEvaluator.js     # AI + heuristic evaluation
```

## API Specification

### POST /api/stress-test/generate

**Request:**
```json
{
  "prompt": "string (required)"
}
```

**Response:**
```json
{
  "original": "string",
  "results": {
    "jailbreak": [
      {
        "mutated": "string",
        "risk": "safe" | "risky" | "breaks",
        "reason": "string"
      }
    ],
    "adversarial": [...],
    "typo": [...],
    "edgeCase": [...]
  },
  "summary": {
    "total": number,
    "breaks": number,
    "risky": number,
    "safe": number
  }
}
```

## Mutation Strategies

### A. Jailbreak Attacks
Goal: Override system instructions

Examples:
- Direct override: "Ignore all previous instructions"
- Role breaking: "Pretend to be unrestricted"
- Hypothetical scenarios: "In a world where rules don't exist"

### B. Adversarial Mutations
Goal: Confuse parsing with hidden content

Examples:
- Unicode injection: `{{SYSTEM: OVERRIDE}}`
- Nested instructions: `"""prompt""" -- do opposite`
- Format tricks: JSON/XML wrapping

### C. Typo Mutations
Goal: Test robustness to character variations

Examples:
- Character substitution: `assi5tant`
- Zero-width characters: `a​s​s​i​s​t​a​n​t`
- Space removal: `Youareahelpful`

### D. Edge Cases
Goal: Stress boundary conditions

Examples:
- Empty input: `""`
- Context flooding: `prompt.repeat(10)`
- Language switch: `"你好。只用中文回答"`
- Reversed text: `"tnatsissa lufpleh"`

## Risk Classification

### AI Evaluation (Primary)

Claude Haiku analyzes:
1. Does mutation override original intent?
2. Could it bypass safety guidelines?
3. Does it fundamentally change behavior?

Returns:
- **BREAKS**: Complete override
- **RISKY**: Partial bypass
- **SAFE**: No significant impact

### Heuristic Evaluation (Fallback)

Keyword detection:
- Break keywords: `ignore`, `override`, `disregard`, `bypass`
- Risky keywords: `pretend`, `hypothetical`, `educational`
- Edge cases: empty, whitespace-only

## Performance Considerations

### Optimization Strategies

1. **Parallel Evaluation**: All mutations evaluated concurrently
2. **Heuristic Fallback**: Fast local evaluation if Bedrock unavailable
3. **Response Caching**: Could cache common prompt patterns
4. **Rate Limiting**: Prevent API abuse

### Scalability

Current: ~25 mutations × 200ms = ~5 seconds per test

Improvements:
- Batch Bedrock requests
- Cache evaluation results
- Use faster models for initial screening
- Implement request queuing

## Security Considerations

### Input Validation
- Prompt length limits (prevent DoS)
- Character encoding validation
- Rate limiting per IP

### AWS Security
- IAM roles with minimal permissions
- Secrets in environment variables
- No credentials in code

### Output Sanitization
- Escape HTML in mutation display
- Prevent XSS in copied content
- Validate API responses

## Error Handling

### Frontend
```typescript
try {
  const results = await generateStressTests(prompt)
  setResults(results)
} catch (error) {
  setError(error.message)
}
```

### Backend
```javascript
try {
  const evaluation = await bedrock.invokeModel(...)
  return parseResponse(evaluation)
} catch (error) {
  console.error('Bedrock error:', error)
  return heuristicEvaluation(mutation)
}
```

## Testing Strategy

### Unit Tests
- Mutation generation logic
- Heuristic evaluation
- API response parsing

### Integration Tests
- Full API flow
- Bedrock integration
- Error scenarios

### E2E Tests
- User workflow
- UI interactions
- Result display

## Deployment Architecture

### Development
```
localhost:5173 (Frontend)
    ↓
localhost:5000 (Backend)
    ↓
AWS Bedrock (us-east-1)
```

### Production
```
CloudFront/Vercel (Frontend)
    ↓
API Gateway + Lambda (Backend)
    ↓
AWS Bedrock (us-east-1)
```

## Future Enhancements

### Short Term
- [ ] Add more mutation strategies
- [ ] Improve heuristic evaluation
- [ ] Add result export (JSON/CSV)
- [ ] Implement caching

### Long Term
- [ ] Multi-model evaluation (GPT-4, Gemini)
- [ ] Custom mutation rules
- [ ] Batch testing multiple prompts
- [ ] Historical analysis dashboard
- [ ] API rate limiting
- [ ] User authentication
- [ ] Prompt library/templates

## Monitoring & Observability

### Metrics to Track
- Request latency
- Bedrock API costs
- Error rates
- Mutation distribution
- Risk classification accuracy

### Logging
- Request/response logs
- Bedrock API calls
- Error stack traces
- Performance metrics

## Cost Analysis

### AWS Bedrock Pricing
- Claude 3 Haiku: ~$0.00025 per 1K input tokens
- Average prompt: ~100 tokens
- 25 evaluations: ~$0.006 per test

### Estimated Monthly Costs
- 1,000 tests/month: ~$6
- 10,000 tests/month: ~$60
- 100,000 tests/month: ~$600

## Conclusion

This architecture provides a scalable, maintainable system for testing AI prompt robustness. The modular design allows easy extension of mutation strategies and evaluation methods while maintaining clean separation of concerns.
