# 🐍 Python FastAPI Backend

Clean, fast, and powerful backend for AI Prompt Stress Tester.

## 🚀 Quick Start

### Install with uv (recommended)

```bash
# Install dependencies
uv pip install -e .

# Or install directly
uv pip install fastapi uvicorn boto3 python-dotenv pydantic
```

### Configure AWS

```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

### Run

```bash
# Development (with hot reload)
python run.py

# Or with uvicorn directly
uvicorn app.main:app --reload --port 5000
```

## 🧪 Test

```bash
# Test mutation generation
python test_mutations.py

# Test AWS Bedrock
python test_bedrock.py
```

## 📁 Structure

```
backend-python/
├── app/
│   ├── main.py              # FastAPI app
│   ├── models.py            # Pydantic models
│   ├── routes/
│   │   └── stress_test.py   # API endpoints
│   └── services/
│       ├── mutation_generator.py
│       └── risk_evaluator.py
├── pyproject.toml           # Dependencies
├── run.py                   # Server runner
├── test_mutations.py        # Test script
└── test_bedrock.py          # AWS test
```

## 🎯 Why Python?

- ✅ Better AWS SDK (boto3)
- ✅ Cleaner async/await
- ✅ FastAPI = fast & modern
- ✅ Type hints with Pydantic
- ✅ Less boilerplate
- ✅ Better for AI/ML work

## 📦 Dependencies

- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Boto3** - AWS SDK
- **Pydantic** - Data validation
- **python-dotenv** - Environment variables

## 🔧 API Endpoints

### POST /api/stress-test/generate
Generate stress tests for a prompt

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

### GET /
Health check

### GET /health
Detailed health status

## 🎉 Ready!

Your Python backend is ready to rock! 🚀
