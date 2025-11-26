# ⚡ AI Prompt Stress Tester

> Test your AI prompts against 25 attack variations including jailbreaks, adversarial mutations, typos, and edge cases.

[![Status](https://img.shields.io/badge/status-ready-brightgreen)]()
[![Node](https://img.shields.io/badge/node-18%2B-brightgreen)]()
[![React](https://img.shields.io/badge/react-19-blue)]()
[![AWS](https://img.shields.io/badge/AWS-Bedrock-orange)]()

A powerful security testing tool that generates adversarial variations of AI prompts and evaluates their risk using AWS Bedrock's Claude Haiku. Built with React, Node.js, and AWS Bedrock.

## 🎯 Features

- **Jailbreak Detection**: Tests for instruction override attempts
- **Adversarial Mutations**: Unicode tricks, hidden injections, nested instructions
- **Typo Mutations**: Character swaps and parsing confusion
- **Edge Cases**: Empty inputs, context flooding, language switches
- **AI-Powered Evaluation**: Uses Claude Haiku via AWS Bedrock for risk assessment
- **Clean UI**: GitIngest-inspired interface with real-time results

## 🏗️ Architecture

```
Frontend (React + Vite + Tailwind)
       ↓
Backend API (Node + Express)
       ↓
AWS Bedrock (Claude Haiku)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- AWS Account with Bedrock access
- AWS credentials configured

### Backend Setup

```bash
cd backend
npm install

# Configure AWS credentials
cp .env.example .env
# Edit .env with your AWS credentials

npm start
```

### Frontend Setup

```bash
cd frontend
npm install

# Configure API URL
cp .env.example .env

npm run dev
```

Visit `http://localhost:5173`

## 📦 Installation

### Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `@aws-sdk/client-bedrock-runtime` - AWS Bedrock SDK
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs:
- `react` + `react-dom` - UI framework
- `axios` - HTTP client
- `tailwindcss` - Styling
- `vite` - Build tool

## 🔧 Configuration

### AWS Bedrock Setup

1. Enable Claude 3 Haiku in AWS Bedrock console
2. Create IAM user with Bedrock permissions
3. Add credentials to `backend/.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

### Environment Variables

**Backend** (`backend/.env`):
- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `PORT` - Server port (default: 5000)

**Frontend** (`frontend/.env`):
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## 🧪 How It Works

### 1. Mutation Generation

The system generates 4 types of mutations:

**Jailbreak Attacks** (7 variations)
- Instruction overrides
- Role breaking
- Unrestricted mode requests

**Adversarial Mutations** (6 variations)
- Unicode injection
- Hidden instructions
- Nested prompts

**Typo Mutations** (5 variations)
- Character swaps
- Zero-width characters
- Space removal

**Edge Cases** (7 variations)
- Empty/whitespace inputs
- Context flooding
- Language switches
- Reversed text

### 2. Risk Evaluation

Each mutation is evaluated by:

1. **AI Evaluation** (Primary): Claude Haiku analyzes if mutation breaks intent
2. **Heuristic Fallback**: Keyword-based detection if AI unavailable

Risk Levels:
- 🔴 **BREAKS**: Completely overrides original intent
- 🟡 **RISKY**: Might partially bypass intent
- 🟢 **SAFE**: Doesn't affect core intent

### 3. Results Display

Results are grouped by category with:
- Risk level badge
- Mutated prompt preview
- Reason for classification
- Copy button for testing

## 📁 Project Structure

```
.
├── backend/
│   ├── routes/
│   │   └── stressTest.js       # API endpoints
│   ├── services/
│   │   ├── mutationGenerator.js # Mutation logic
│   │   └── riskEvaluator.js    # AI evaluation
│   ├── server.js               # Express app
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PromptInput.tsx
│   │   │   ├── MutationCard.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   └── LoadingScanner.tsx
│   │   ├── utils/
│   │   │   └── api.ts          # API client
│   │   ├── types.ts            # TypeScript types
│   │   └── App.tsx             # Main app
│   └── package.json
│
└── README.md
```

## 🎨 UI Components

- **PromptInput**: Text area for entering prompts
- **LoadingScanner**: Animated loading state
- **CategorySection**: Groups mutations by type
- **MutationCard**: Displays individual mutation with risk level

## 🔒 Security Notes

- Never commit `.env` files
- Use IAM roles with minimal Bedrock permissions
- Rate limit API endpoints in production
- Sanitize user inputs

## 🚢 Deployment

### Backend Options

- **AWS Lambda + API Gateway**: Serverless
- **EC2**: Traditional server
- **Render/Railway**: Quick deployment

### Frontend Options

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **S3 + CloudFront**: Static hosting

## 📝 API Reference

### POST `/api/stress-test/generate`

Generate stress tests for a prompt.

**Request:**
```json
{
  "prompt": "You are a helpful assistant."
}
```

**Response:**
```json
{
  "original": "You are a helpful assistant.",
  "results": {
    "jailbreak": [...],
    "adversarial": [...],
    "typo": [...],
    "edgeCase": [...]
  },
  "summary": {
    "total": 25,
    "breaks": 8,
    "risky": 6,
    "safe": 11
  }
}
```

## 🤝 Contributing

Contributions welcome! Areas to improve:

- Additional mutation strategies
- More sophisticated heuristics
- Performance optimizations
- UI enhancements

## 📄 License

MIT

## 🙏 Acknowledgments

- AWS Bedrock for AI evaluation
- GitIngest for UI inspiration
- Anthropic Claude for risk assessment
