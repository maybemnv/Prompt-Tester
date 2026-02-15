import axios from 'axios';

/**
 * API client for the AI Prompt Stress Tester backend
 */

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/stress-test',
  timeout: 60000, // 60 second timeout (increased for AI processing)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle loading states or authentication
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here (e.g., auth tokens)
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
api.interceptors.response.use(
  (response) => {
    console.log(`Response from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Type definitions
export interface StressTestRequest {
  prompt: string;
}

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

export interface Summary {
  total: number;
  breaks: number;
  risky: number;
  safe: number;
}

export interface StressTestResponse {
  original: string;
  results: MutationResults;
  summary: Summary;
}

/**
 * Generates stress tests for a given prompt
 * @param request - The stress test request containing the prompt
 * @returns Promise resolving to stress test results
 */
export const generateStressTests = async (
  request: StressTestRequest
): Promise<StressTestResponse> => {
  try {
    console.log('Sending stress test request:', request);
    const response = await api.post<StressTestResponse>('/generate', request);
    console.log('Received stress test response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating stress tests:', error);
    // Re-throw with more context
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      throw new Error(`API Error: ${error.response?.data?.detail || error.message}`);
    }
    throw error;
  }
};

/**
 * Health check for the backend API
 * @returns Promise resolving to health status
 */
export const healthCheck = async (): Promise<{ status: string; region: string }> => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;