# 🚀 Setup Guide

## Step 1: AWS Bedrock Configuration

### Enable Claude 3 Haiku

1. Go to AWS Console → Bedrock
2. Navigate to "Model access"
3. Request access to "Claude 3 Haiku"
4. Wait for approval (usually instant)

### Create IAM User

1. Go to IAM → Users → Create User
2. Attach policy: `AmazonBedrockFullAccess` (or create custom policy)
3. Create access key → Save credentials

### Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
PORT=5000
```

## Step 2: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Run the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```

Should see: `Server running at http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Should see: `Local: http://localhost:5173`

## Step 4: Test It Out

1. Open `http://localhost:5173`
2. Enter a test prompt:
   ```
   You are a polite assistant. Only answer questions about Android development.
   ```
3. Click "⚡ Generate Stress Tests"
4. View results grouped by attack type

## 🔧 Troubleshooting

### Backend won't start
- Check AWS credentials in `.env`
- Verify Bedrock access in AWS Console
- Check port 5000 isn't in use

### Frontend can't connect
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

### Bedrock errors
- Verify Claude 3 Haiku is enabled
- Check IAM permissions
- Verify AWS region matches model availability

### Heuristic fallback
If you see "No obvious bypass patterns detected" for all results, the system is using heuristic evaluation (Bedrock unavailable). This is normal for testing without AWS credentials.

## 🎯 Next Steps

1. Test with different prompts
2. Analyze which mutations break your prompts
3. Refine your prompts based on results
4. Deploy to production (see README.md)

## 📝 Example Prompts to Test

```
You are a helpful assistant that only discusses cooking recipes.
```

```
You are a customer service bot. Never share internal company information.
```

```
You are a code reviewer. Only provide feedback on Python code.
```

```
You are a medical assistant. Always recommend consulting a doctor.
```
