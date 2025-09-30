PrimaSpot is a full-stack web application for analyzing Instagram influencer profiles, posts, and media.  
It consists of a React + Vite frontend and an Express + Python backend, providing a seamless experience for influencer analytics and media exploration.

## Project Structure

```
PrimaSpot/
├── Frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Main pages (Profile, Search)
│   │   ├── services/     # API service layer
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   ├── index.html        # Main HTML file
│   ├── package.json      # Frontend dependencies
│   └── ...
├── Backend/         # Express + Python backend
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── utils/            # Backend utilities
│   ├── app.py            # Python backend (for analytics)
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── ...
└── README.md           # Project documentation
```

## Features

- **Influencer Profile Search**: Search and view Instagram influencer profiles.
- **Analytics Charts**: Visualize influencer statistics and engagement.
- **Posts & Reels Grid**: Browse posts and reels in a responsive grid.
- **Loading Spinner**: User-friendly loading indicators.
- **Debounced Search**: Fast, efficient search experience.
- **Backend API**: Express routes for profile, media, and search endpoints.
- **Python Analytics**: Advanced analytics via Python integration.
- **Tailwind CSS**: Modern, responsive UI styling.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup

#### 1. Clone the repository
```powershell
git clone https://github.com/NitinPathak20/primaspot_project.git
cd primaspot_project
```

#### 2. Install dependencies
##### Frontend
```powershell
cd IG/Frontend
npm install
```
##### Backend
```powershell
cd ../IGBackend
npm install
```

#### 3. Start the servers
##### Backend (Express)
```powershell
node server.js
```
##### Python Analytics (optional)
```powershell
python app.py
```
##### Frontend (Vite)
```powershell
cd ../Frontend
npm run dev
```

### 4. Access the app
Open your browser and go to `http://localhost:5173` (default Vite port).

## API Endpoints
- `/api/profile` - Get influencer profile data
- `/api/media` - Get posts and reels
- `/api/search` - Search influencers

## Technologies Used
- React, Vite
- Tailwind CSS
- Express.js
