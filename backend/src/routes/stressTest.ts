import express, { Request, Response } from 'express';
import { MutationGenerator } from '../services/mutationGenerator.js';
import { RiskEvaluator } from '../services/riskEvaluator.js';

const router = express.Router();
const mutationGenerator = new MutationGenerator();
const riskEvaluator = new RiskEvaluator();

interface StressTestRequest {
  prompt: string;
}

// POST /api/stress-test/generate
router.post('/generate', async (req: Request<{}, {}, StressTestRequest>, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Valid prompt is required' });
      return;
    }

    // Generate mutations
    const mutations = mutationGenerator.generateAll(prompt);

    // Evaluate each mutation
    const evaluations = await riskEvaluator.evaluateAll(prompt, mutations);

    // Format response
    const response = {
      original: prompt,
      results: evaluations,
      summary: {
        total: Object.values(evaluations).flat().length,
        breaks: Object.values(evaluations)
          .flat()
          .filter((e) => e.risk === 'breaks').length,
        risky: Object.values(evaluations)
          .flat()
          .filter((e) => e.risk === 'risky').length,
        safe: Object.values(evaluations)
          .flat()
          .filter((e) => e.risk === 'safe').length,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Stress test error:', error);
    res.status(500).json({ error: 'Failed to generate stress tests' });
  }
});

export default router;
