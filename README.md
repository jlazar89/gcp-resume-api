# GCP Resume API

A serverless Resume API built with Google Cloud Functions and Firestore, with automatic deployment via GitHub Actions.

## 🚀 Live API

**Endpoint:** https://getresume-gtjkmhs2jq-nn.a.run.app

**Usage:**
```bash
curl "https://getresume-gtjkmhs2jq-nn.a.run.app/?id=resume-001"
```

## 🏗️ Architecture

- **Cloud Functions (Gen2):** Serverless API endpoint
- **Firestore:** NoSQL database for resume storage
- **GitHub Actions:** CI/CD pipeline for automatic deployment
- **Node.js 20:** Runtime environment

## 📋 Features

- RESTful API that serves resume data in JSON format
- CORS-enabled for cross-origin requests
- Automatic deployment on push to main branch
- Error handling and validation
- Scalable serverless architecture

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- Google Cloud CLI
- GCP account with billing enabled

### Setup

1. Clone the repository:
```bash
git clone https://github.com/jlazar89/gcp-resume-api.git
cd gcp-resume-api
```

2. Install dependencies:
```bash
npm install
```

3. Authenticate with GCP:
```bash
gcloud auth application-default login
```

4. Deploy to Cloud Functions:
```bash
gcloud functions deploy getResume \
  --gen2 \
  --runtime=nodejs20 \
  --region=northamerica-northeast1 \
  --source=. \
  --entry-point=getResume \
  --trigger-http \
  --allow-unauthenticated
```

## 📊 API Documentation

### Get Resume

**Endpoint:** `GET /?id={resume-id}`

**Parameters:**
- `id` (optional): Resume ID to fetch. Defaults to `resume-001`

**Response:**
```json
{
  "id": "resume-001",
  "basics": {
    "name": "Your Name",
    "email": "your.email@example.com",
    ...
  },
  "work": [...],
  "education": [...],
  "skills": [...]
}
```

**Error Responses:**
- `404`: Resume not found
- `500`: Internal server error

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for automatic deployment:

1. Push code to `main` branch
2. GitHub Actions triggers workflow
3. Authenticates with GCP
4. Deploys Cloud Function
5. Function is live!

## 📝 License

MIT

## 👤 Author

Jeffy Lazar - [GitHub](https://github.com/jlazar89)
