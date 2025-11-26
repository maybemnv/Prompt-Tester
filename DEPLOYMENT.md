# 🚀 Deployment Guide

## Overview

This guide covers deploying the AI Prompt Stress Tester to production.

## Architecture Options

### Option 1: Serverless (Recommended)
- **Frontend**: Vercel/Netlify
- **Backend**: AWS Lambda + API Gateway
- **Cost**: Pay per use, ~$5-20/month

### Option 2: Traditional
- **Frontend**: S3 + CloudFront
- **Backend**: EC2/Render
- **Cost**: Fixed, ~$10-50/month

### Option 3: Hybrid
- **Frontend**: Vercel
- **Backend**: Render/Railway
- **Cost**: ~$5-15/month

## Frontend Deployment

### Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow prompts
# Set environment variable: VITE_API_URL=https://your-backend-url
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variable in Netlify dashboard
# VITE_API_URL=https://your-backend-url
```

### AWS S3 + CloudFront

```bash
# Build
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Create CloudFront distribution
# Point to S3 bucket
# Enable HTTPS
```

## Backend Deployment

### AWS Lambda + API Gateway

#### 1. Package Backend

```bash
cd backend
npm install --production
zip -r function.zip .
```

#### 2. Create Lambda Function

```bash
# Using AWS CLI
aws lambda create-function \
  --function-name prompt-stress-tester \
  --runtime nodejs18.x \
  --handler server.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role
```

#### 3. Add Environment Variables

```bash
aws lambda update-function-configuration \
  --function-name prompt-stress-tester \
  --environment Variables="{
    AWS_REGION=us-east-1,
    NODE_ENV=production
  }"
```

#### 4. Create API Gateway

- Create REST API
- Create resource: `/api/stress-test/generate`
- Create POST method
- Link to Lambda function
- Deploy to stage (e.g., `prod`)

#### 5. Update Lambda Handler

Edit `backend/server.js`:

```javascript
// Add at the end
export const handler = async (event) => {
  // Lambda handler wrapper
  const { body } = event;
  const parsedBody = JSON.parse(body);
  
  // Your existing logic
  // Return Lambda-compatible response
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result)
  };
};
```

### Render

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to render.com
# 3. New Web Service
# 4. Connect GitHub repo
# 5. Configure:
#    - Build Command: cd backend && npm install
#    - Start Command: cd backend && npm start
#    - Environment: Node
# 6. Add environment variables in dashboard
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up

# Add environment variables
railway variables set AWS_REGION=us-east-1
railway variables set AWS_ACCESS_KEY_ID=xxx
railway variables set AWS_SECRET_ACCESS_KEY=xxx
```

### EC2 (Traditional)

```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install PM2
sudo npm install -g pm2

# 5. Clone repo
git clone your-repo-url
cd backend
npm install

# 6. Create .env file
nano .env
# Add your environment variables

# 7. Start with PM2
pm2 start server.js --name prompt-tester
pm2 startup
pm2 save

# 8. Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables

### Frontend

```env
VITE_API_URL=https://api.your-domain.com
```

### Backend

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
PORT=5000
NODE_ENV=production
```

## Security Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Enable CORS only for your frontend domain
- [ ] Use IAM roles instead of access keys (Lambda)
- [ ] Set up rate limiting
- [ ] Enable CloudWatch logging
- [ ] Use secrets manager for sensitive data
- [ ] Implement request validation
- [ ] Add authentication (if needed)

## Monitoring

### AWS CloudWatch

```javascript
// Add to backend
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const cloudwatch = new CloudWatchClient({ region: "us-east-1" });

// Log metrics
await cloudwatch.send(new PutMetricDataCommand({
  Namespace: "PromptStressTester",
  MetricData: [{
    MetricName: "RequestCount",
    Value: 1,
    Unit: "Count"
  }]
}));
```

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for APM

## Performance Optimization

### Frontend

```javascript
// Lazy load components
const CategorySection = lazy(() => import('./components/CategorySection'));

// Code splitting
// Vite handles this automatically
```

### Backend

```javascript
// Add caching
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

// Cache results
const cacheKey = `mutation_${hash(prompt)}`;
const cached = cache.get(cacheKey);
if (cached) return cached;

// ... generate results ...
cache.set(cacheKey, results);
```

### CDN

- Use CloudFront for frontend assets
- Enable gzip compression
- Set cache headers

## Cost Optimization

### AWS Bedrock

```javascript
// Batch requests when possible
const evaluations = await Promise.all(
  mutations.map(m => evaluateMutation(original, m))
);

// Use heuristics for obvious cases
if (hasObviousJailbreak(mutation)) {
  return { risk: 'breaks', reason: 'Obvious jailbreak pattern' };
}
```

### Lambda

- Increase memory for faster execution (paradoxically cheaper)
- Use provisioned concurrency for consistent performance
- Set appropriate timeout (30s recommended)

## Scaling Considerations

### Current Limits
- 25 mutations per request
- ~5 seconds per test
- ~200 requests/minute (Bedrock limit)

### Scaling Strategies

1. **Request Queuing**
```javascript
import Bull from 'bull';
const queue = new Bull('stress-tests');

queue.process(async (job) => {
  return await generateStressTests(job.data.prompt);
});
```

2. **Horizontal Scaling**
- Multiple Lambda instances (automatic)
- Load balancer for EC2
- Redis for shared cache

3. **Database**
- Store results in DynamoDB/MongoDB
- Enable result sharing
- Historical analysis

## Rollback Strategy

### Vercel/Netlify
- Automatic rollback in dashboard
- Keep previous deployments

### Lambda
```bash
# List versions
aws lambda list-versions-by-function --function-name prompt-stress-tester

# Rollback
aws lambda update-alias \
  --function-name prompt-stress-tester \
  --name prod \
  --function-version 2
```

### EC2
```bash
# Using PM2
pm2 list
pm2 stop prompt-tester
git checkout previous-commit
npm install
pm2 restart prompt-tester
```

## Health Checks

### Backend Endpoint

```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Monitoring Script

```bash
#!/bin/bash
# health-check.sh

ENDPOINT="https://api.your-domain.com/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $ENDPOINT)

if [ $RESPONSE -eq 200 ]; then
  echo "✓ Service healthy"
else
  echo "✗ Service down (HTTP $RESPONSE)"
  # Send alert
fi
```

## Backup Strategy

### Code
- GitHub/GitLab for version control
- Tag releases: `git tag v1.0.0`

### Data (if using database)
- Daily automated backups
- Point-in-time recovery
- Cross-region replication

## Post-Deployment

1. **Test Production**
```bash
curl -X POST https://api.your-domain.com/api/stress-test/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test prompt"}'
```

2. **Monitor Logs**
- Check CloudWatch/Render logs
- Verify no errors
- Monitor response times

3. **Load Test**
```bash
# Using Apache Bench
ab -n 100 -c 10 -p test.json -T application/json \
  https://api.your-domain.com/api/stress-test/generate
```

4. **Update DNS**
- Point domain to deployment
- Wait for propagation
- Test from multiple locations

## Troubleshooting

### High Latency
- Check Bedrock region
- Enable caching
- Increase Lambda memory

### CORS Errors
- Verify allowed origins
- Check preflight requests
- Enable credentials if needed

### Rate Limiting
- Implement exponential backoff
- Queue requests
- Show user feedback

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review CloudWatch metrics
- Optimize costs
- Security patches

### Monitoring Alerts
- Response time > 10s
- Error rate > 5%
- Cost spike > 20%
- Bedrock quota exceeded

---

**Need help?** Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design details.
