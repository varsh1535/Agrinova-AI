🌱 AgriNova AI

Scan. Predict. Grow.
AI-powered precision agriculture ecosystem for regional farmers.

AgriNova AI is a full-stack agritech intelligence platform that helps farmers detect crop diseases early, receive multilingual farming guidance, track weather and mandi prices, and access predictive agriculture insights through AI.

The platform combines:

AI crop disease detection
Voice-guided farming assistance
Predictive analytics
Agriculture dashboards
Community collaboration
Dockerized cloud-ready infrastructure
🚀 Features
🌾 AI Crop Disease Detection
Upload or capture crop images
AI analyzes crop health
Detects diseases using computer vision
Returns:
disease name
confidence score
severity level
treatment suggestions
fertilizer/pesticide recommendations
🎤 Multilingual Voice Assistant

Supports:

Kannada
Hindi
English

Voice-first interaction helps:

elderly farmers
low-literacy users
regional farmers
📈 Predictive Agriculture Intelligence
Crop risk prediction
Disease outbreak analytics
Yield forecasting
Smart farming insights
🌦 Weather & Market Integration
Hyperlocal weather updates
Rainfall alerts
Mandi price tracking
Crop-specific recommendations
📊 Analytics Dashboard

Professional dashboard with:

KPI cards
Disease heatmaps
Farmer analytics
Yield trends
AI insights
👨‍🌾 Farmer Community
Share farming tips
Community discussions
Like/comment system
Crop issue discussions
🏗 Tech Stack
Frontend
React.js
Tailwind CSS
Framer Motion
React Router DOM
Axios
Recharts
Lucide Icons
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Multer
bcryptjs
AI / ML
FastAPI
Hugging Face
TensorFlow
Computer Vision
DevOps / Infrastructure
Docker
Docker Compose
Nginx
🧠 System Architecture
Frontend (React)
        ↓
Backend API (Express.js)
        ↓
AI Microservice (FastAPI)
        ↓
MongoDB Database

Docker Compose orchestrates:

frontend
backend
AI service
MongoDB
Nginx
📂 Project Structure
AgriNova-AI/
│
├── frontend/          # React frontend
├── backend/           # Express backend API
├── ai-service/        # FastAPI AI microservice
├── nginx/             # Reverse proxy config
├── docker/            # Docker scripts
├── uploads/           # Uploaded crop images
├── docker-compose.yml
├── package.json
└── README.md
⚙️ Environment Variables

Create a .env file in the root directory:

NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://mongodb:27017/agrinova

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

AI_SERVICE_URL=http://ai-service:8000

HUGGINGFACE_API_TOKEN=

HUGGINGFACE_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification

OPENWEATHER_API_KEY=

DEFAULT_CITY=Bengaluru
🐳 Docker Setup
Run Entire Application
docker compose up --build
Access Services
Service	URL
Main App	http://localhost
Frontend	http://localhost:5173
Backend API	http://localhost:5000
AI Service	http://localhost:8000
💻 Local Development Setup
1. Clone Repository
git clone <your-repo-url>
cd AgriNova-AI
2. Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install
AI Service
cd ai-service
pip install -r requirements.txt
3. Start MongoDB
docker run --name agrinova-mongo -p 27017:27017 -d mongo:7
4. Run AI Service
cd ai-service
uvicorn app.main:app --host 0.0.0.0 --port 8000
5. Run Backend
cd backend
npm run dev
6. Run Frontend
cd frontend
npm run dev
🔐 Demo Credentials
Farmer
farmer@agrinova.ai
password123
Admin
admin@agrinova.ai
password123
📡 API Endpoints
Authentication
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
Crop Scan
POST /api/scans
GET /api/scans
Dashboard
GET /api/dashboard/overview
Intelligence APIs
GET /api/intelligence/weather
GET /api/intelligence/market
Community
GET /api/community
POST /api/community
POST /api/community/:id/like
POST /api/community/:id/comments
🌍 Future Enhancements
IoT soil sensors
Satellite crop monitoring
Smart irrigation systems
Offline AI predictions
AI chatbot support
Government scheme integration
Mobile application
🎯 Project Vision

AgriNova AI aims to empower regional farmers through:

AI-driven farming intelligence
multilingual accessibility
predictive agriculture analytics
scalable technology infrastructure
👨‍💻 Authors

Developed by Team AgriNova AI

📜 License

This project is licensed under the MIT License.

🌱 Final Note

“AgriNova AI is not just a farming app — it is an agriculture intelligence ecosystem designed to transform the future of regional farming through AI, accessibility, and scalable cloud-ready technology.”
