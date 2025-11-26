import axios from 'axios'
import type { StressTestResults } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function generateStressTests(prompt: string): Promise<StressTestResults> {
  const response = await axios.post(`${API_BASE_URL}/api/stress-test/generate`, {
    prompt,
  })
  return response.data
}
