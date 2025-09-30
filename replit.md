# Instagram Influencer Analytics

## Overview
This is an Instagram Influencer Analytics application that allows users to search for Instagram profiles and view detailed analytics and insights about influencers, including engagement metrics, posts, and reels.

## Project Architecture

### Frontend
- **Framework**: React + Vite
- **Location**: `/Frontend` directory
- **Port**: 5000 (served on 0.0.0.0)
- **Key Features**:
  - Search for Instagram influencers
  - View detailed profile analytics
  - Display posts and reels grids
  - Charts and engagement metrics
- **Key Dependencies**: React, React Router, Axios, Chart.js, Tailwind CSS
- **Design**: Modern dark mode theme with glassmorphism effects, gradient accents (indigo/purple/pink), and smooth animations

### Backend
- **Framework**: Express.js (Node.js)
- **Location**: `/IGBackend` directory
- **Port**: 3001 (localhost)
- **Key Features**:
  - Search API for finding influencers
  - Profile data retrieval
  - Media (posts/reels) fetching
  - Image proxy service
- **API Integration**: RapidAPI (Instagram Scraper API)

## Environment Variables
The backend requires the following environment variables (stored in `IGBackend/.env`):
- `RAPIDAPI_KEY`: Your RapidAPI key for Instagram Scraper API
- `RAPIDAPI_HOST`: RapidAPI host (instagram-scraper-stable-api.p.rapidapi.com)
- `PORT`: Backend server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)

## Workflows
1. **Frontend**: Runs the Vite dev server on port 5000
2. **Backend**: Runs the Express server on port 3001

## Recent Changes (Sept 30, 2025)
- Imported project from GitHub
- Configured Vite to bind to 0.0.0.0:5000 for Replit compatibility
- Updated backend port from 5001 to 3001 (allowed Replit port)
- Updated frontend API configuration to use dynamic hostname for backend
- Created Node.js .gitignore file
- Set up workflows for both frontend and backend
- Completely redesigned UI with modern dark mode theme while preserving all functionality
- Implemented environment-aware API and image proxy URLs for production deployment

## Project Structure
```
.
├── Frontend/           # React + Vite frontend application
│   ├── src/
│   │   ├── components/ # React components (charts, grids, headers)
│   │   ├── pages/      # Page components (Search, Profile)
│   │   ├── services/   # API service layer
│   │   └── hooks/      # Custom React hooks
│   └── package.json
├── IGBackend/          # Express.js backend API
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── server.js       # Main server file
│   └── package.json
└── package.json        # Root package.json
```

## Notes
- The Python Flask backend (`IGBackend/app.py`) is not used; the project uses Express.js instead
- Frontend communicates with backend via HTTPS on the same hostname but different port
