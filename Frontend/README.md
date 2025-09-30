# Instagram Influencer Analytics - Frontend

A modern React application for analyzing Instagram influencer profiles, posts, and engagement metrics. Built with React, Vite, TailwindCSS, and Chart.js.

## 🌟 Features

### Core Features

- **Influencer Search**: Search for Instagram influencers by username
- **Profile Analytics**: Comprehensive profile overview with key metrics
- **Engagement Analytics**: Visual charts and graphs for engagement data
- **Posts Grid**: Display and analyze recent posts with detailed metrics
- **Reels Grid**: Showcase recent reels with performance data
- **Responsive Design**: Mobile-first responsive design for all devices

### Technical Features

- **Modern React**: Built with React 19 and functional components
- **Fast Development**: Powered by Vite for lightning-fast development
- **Beautiful UI**: Styled with TailwindCSS for modern, clean design
- **Interactive Charts**: Chart.js integration for data visualization
- **State Management**: Custom hooks for efficient data management
- **Error Handling**: Comprehensive error handling and loading states

## 📁 Project Structure

```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AnalyticsCharts.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PostsGrid.jsx
│   │   ├── ProfileHeader.jsx
│   │   └── ReelsGrid.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.js
│   │   └── useInfluencerData.js
│   ├── pages/             # Main page components
│   │   ├── ProfilePage.jsx
│   │   └── SearchPage.jsx
│   ├── services/          # API and external services
│   │   └── api.js
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles with TailwindCSS
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Flask backend (see IGBackend folder)

### Installation

1. **Navigate to the Frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Backend API Configuration

The frontend is configured to connect to the Flask backend at `http://localhost:5000`. You can modify this in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:5000";
```

## 🎨 UI Components

### SearchPage

- Username search functionality with debounced input
- Real-time search results display
- Influencer cards with profile images and basic info

### ProfilePage

- Complete influencer profile display
- Analytics charts and metrics visualization
- Posts and reels grids with detailed information

### ProfileHeader

- Profile image and basic information display
- Key metrics (followers, engagement rate, average likes/comments)
- Video performance statistics when available

### AnalyticsCharts

- Engagement comparison bar charts
- Content distribution doughnut charts
- Post performance line trends
- Engagement rate indicators with benchmarks

### PostsGrid & ReelsGrid

- Responsive grid layouts for posts and reels
- Interactive cards with hover effects
- Modal views for detailed post/reel information
- Engagement statistics and external links

## 📊 Data Visualization

The application uses Chart.js to display:

- **Bar Charts**: Average engagement metrics comparison
- **Line Charts**: Post performance trends over time
- **Doughnut Charts**: Content distribution (Posts vs Reels)
- **Custom Metrics**: Engagement rate visualization with industry benchmarks

## 🔄 API Integration

The frontend integrates with three main backend endpoints:

1. **Search Endpoint** (`/search`):

   - Search for influencers by username
   - Returns basic profile information and cid

2. **Profile Endpoint** (`/community`):

   - Fetch detailed profile information using cid
   - Returns engagement metrics and statistics

3. **Posts Endpoint** (`/posts`):
   - Retrieve recent posts and reels using cid
   - Returns content with engagement data

## 📱 Responsive Design

The application is built mobile-first with TailwindCSS:

- **Mobile**: Single column layouts, stacked components
- **Tablet**: Two-column grids where appropriate
- **Desktop**: Full multi-column layouts with sidebar navigation

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Issues**:

   - Ensure Flask backend is running on port 5000
   - Check CORS settings in backend if needed
   - Verify API endpoints are accessible

2. **Dependency Issues**:

   - Use `npm install --legacy-peer-deps` for React 19 compatibility
   - Clear node_modules and package-lock.json if needed

3. **Chart Display Issues**:
   - Ensure Chart.js dependencies are properly installed
   - Check browser console for any errors

## 🛠 Development Guidelines

### Running the Application

1. **Start the Backend**:

   ```bash
   cd IGBackend
   python app.py
   ```

2. **Start the Frontend**:

   ```bash
   cd Frontend
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Code Style

- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Handle loading states appropriately

## 📈 Features Implemented

✅ **Search Functionality**: Username-based influencer search  
✅ **Profile Display**: Comprehensive profile information  
✅ **Analytics Charts**: Visual engagement metrics  
✅ **Posts Grid**: Recent posts with engagement data  
✅ **Reels Grid**: Recent reels with performance metrics  
✅ **Responsive Design**: Mobile-first responsive layout  
✅ **Loading States**: Proper loading indicators  
✅ **Error Handling**: Comprehensive error management

## 🎯 Key Technologies

- **Frontend**: React 19, Vite, React Router
- **Styling**: TailwindCSS, Custom CSS
- **Charts**: Chart.js, React-ChartJS-2
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)

---

**Built for Instagram Influencer Analytics Assignment**
