🚀 Instagram Influencer Analytics

Analyze. Visualize. Decide.
An end-to-end platform to explore Instagram influencers, uncover their engagement metrics, and visualize performance trends – powered by Express.js Backend + React Frontend.

🌟 Why This Project?

In today’s creator economy, brands struggle to find the right influencers.
This project solves that by:

Fetching real influencer data via APIs

Analyzing engagement (likes, comments, video views)

Visualizing patterns through modern charts

Providing a clean UI for quick insights

Think of it as “LinkedIn Analytics for Instagram Creators” 🧑‍💻📊

🔮 Tech Flow
graph LR
A[Frontend - React + Tailwind + Vite] -->|Calls APIs| B[Express.js Backend]
B -->|Fetches Data| C[RapidAPI - Instagram API]
B --> D[Data Processing + Error Handling]
D --> A

✨ Core Features
🔹 Backend Superpowers (Express.js)

✅ Search influencers by username
✅ Fetch profile details (followers, engagement rate, averages)
✅ Get recent posts & reels with metrics
✅ Logging, error handling, health check
✅ Secure with Helmet.js + CORS

🔹 Frontend Magic (React + Vite)

🎨 Responsive UI with TailwindCSS
📊 Beautiful charts (engagement, post trends, reels performance)
⚡ Lightning-fast development with Vite
📱 Mobile-first design
🛠 Error + Loading states for smooth UX

⚙️ Installation Guide
🖥 Backend Setup
cd IGBackend
npm install


.env file:

RAPIDAPI_KEY=your_key
RAPIDAPI_HOST=your_host
PORT=5000


Run server:

npm run dev   # Development
npm start     # Production

🌐 Frontend Setup
cd Frontend
npm install --legacy-peer-deps
npm run dev


Visit 👉 http://localhost:5173

📊 API Showcase
🔍 Search Influencers
GET /search?username=<username>

👥 Profile Analytics
GET /community?cid=<cid>

📝 Posts & Reels
GET /posts?cid=<cid>

📈 Data Visualization Samples

Engagement Rate Chart: Followers vs Avg ER

Content Mix Doughnut: Posts vs Reels

Performance Trend Line: Likes over time

(Screenshots / gifs can be added here to stand out)

🔐 Security Highlights

Secrets hidden in .env

Helmet.js for secure headers

Input validation for all routes

CORS configured for safe frontend calls

HTTPS-ready for production

🚀 Deployment Options

PM2 for production process management

Dockerfile included for containerization

pm2 start server.js --name ig-analytics-api

🧭 Project Uniqueness

Unlike generic CRUD projects, this is real-world ready:

Real APIs instead of mock data

Analytics-first approach (not just data fetching)

Full-stack flow (from API → Backend → Frontend → Charts)

Scalable architecture (can plug more platforms later, e.g., TikTok, YouTube)

👨‍💻 Tech Stack

Backend: Node.js, Express.js, Helmet.js, Axios

Frontend: React 19, Vite, TailwindCSS, Chart.js, Axios

Other Tools: Docker, PM2, RapidAPI

🌟 Future Scope

Add influencer comparison dashboard

Integrate AI for sentiment analysis on captions

Support multiple platforms (TikTok, YouTube)

Export analytics reports as PDF/Excel

❤️ Made For

Brands: Find the right influencers faster

Agencies: Compare and pitch influencer performance

Students/Devs: Learn full-stack dev with real APIs

✨ Built with Node.js, React, Tailwind, and caffeine ☕
