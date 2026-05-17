# AgriNova AI

AgriNova AI is a production-style full-stack agritech platform for crop disease detection, regional farmer guidance, weather intelligence, market prices, analytics, and community collaboration.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios, Recharts, Lucide icons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer
- AI service: FastAPI microservice with Hugging Face inference support and local image-signal fallback
- Infrastructure: Docker, Docker Compose, Nginx reverse proxy

## Features

- Cinematic landing page with autoplay farm drone video
- Signup and login with role selection for Farmer/Admin
- JWT protected application routes
- Farmer dashboard with weather, mandi prices, and quick actions
- Crop image upload/camera capture with AI disease prediction
- Disease result panel with confidence, severity, treatment, pesticide, seed, and prevention tips
- Browser voice assistant with English, Hindi, and Kannada speech recognition/text-to-speech
- Analytics dashboard with KPI cards, charts, risk mix, heatmap, and trends
- Community posts with tags, likes, comments API, and image support
- Dockerized frontend, backend, AI service, MongoDB, and Nginx

## Demo Accounts

The backend seeds these accounts on first startup:

```text
farmer@agrinova.ai / password123
admin@agrinova.ai / password123
```

## Environment Variables

Copy `.env.example` to `.env` in the project root for Docker Compose, or copy `backend/.env.example` to `backend/.env` for local backend development.

```text
JWT_SECRET=replace-with-a-long-random-secret
MONGO_URI=mongodb://mongodb:27017/agrinova
AI_SERVICE_URL=http://ai-service:8000
HUGGINGFACE_API_TOKEN=optional-token
HUGGINGFACE_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
OPENWEATHER_API_KEY=optional-openweather-key
DEFAULT_CITY=Bengaluru
```

If `HUGGINGFACE_API_TOKEN` is empty, the AI service uses a deterministic local image analysis fallback so scans still work. If `OPENWEATHER_API_KEY` is empty, weather uses realistic demo data.

## Run With Docker

```bash
cp .env.example .env
docker compose up --build
```

Open:

- Product via Nginx: `http://localhost`
- Frontend container directly: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`
- AI service health: `http://localhost:8000/health`
- MongoDB for Compass: `mongodb://127.0.0.1:27018/?directConnection=true`

## Local Development

Start MongoDB locally or with Docker:

```bash
docker run --name agrinova-mongo -p 27018:27017 -d mongo:7
```

## MongoDB Compass

AgriNova exposes Docker MongoDB on host port `27018` to avoid clashing with an existing local MongoDB on `27017`.

```text
mongodb://127.0.0.1:27018/?directConnection=true
```

Open database `agrinova`, then collections `users`, `posts`, and `scans`.

Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
pip install -r ai-service/requirements.txt
```

Run services in separate terminals:

```bash
cd ai-service
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

```bash
cd backend
cp .env.example .env
npm run dev
```

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## API Summary

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/scans` multipart field `image`
- `GET /api/scans`
- `GET /api/dashboard/overview`
- `GET /api/intelligence/weather`
- `GET /api/intelligence/market`
- `GET /api/community`
- `POST /api/community`
- `POST /api/community/:id/like`
- `POST /api/community/:id/comments`
- `PUT /api/users/me`

## Folder Structure

```text
frontend/      React/Vite application
backend/       Express API, models, routes, controllers, services
ai-service/    FastAPI disease prediction service
nginx/         Reverse proxy config
docker/        Reserved for deployment extensions
```

## Production Notes

- Replace `JWT_SECRET` with a strong secret.
- Use MongoDB Atlas or a managed MongoDB cluster for production.
- Set `HUGGINGFACE_API_TOKEN` or swap `ai-service/app/main.py` with a hosted TensorFlow/PyTorch model.
- Store uploads in S3-compatible object storage for horizontal scaling.
- Put Nginx behind TLS with a real domain and certificate.
- Restrict CORS to deployed frontend origins.
