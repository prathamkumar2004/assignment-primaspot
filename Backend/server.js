const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import the search routes
const searchRoutes = require('./routes/search.route.js');
const profileRoutes = require('./routes/profile.route.js');
const mediaRoutes = require('./routes/media.route.js');
const app = express();

// Environment variables
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const PORT = process.env.PORT || 3001;

// Check if required environment variables are present
if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
  console.error('❌ Missing required environment variables:');
  if (!RAPIDAPI_KEY) console.error('  - RAPIDAPI_KEY');
  if (!RAPIDAPI_HOST) console.error('  - RAPIDAPI_HOST');
  console.error('Please check your .env file');
  process.exit(1);
}

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
) // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request headers for RapidAPI
const getHeaders = (host) => ({
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': host,
});

// Utility function for making API requests (Will be used by other endpoints)
const makeApiRequest = async (url, params = {}, host) => {
  try {
    console.log(`🚀 Making GET request to: ${url}`);
    console.log(`📋 Query parameters:`, params);
    const headers = getHeaders(host);
    console.log(`🔑 Headers:`, headers);

    const response = await axios.get(url, {
      params,
      headers,
      timeout: 30000 // 30 second timeout
    });

    console.log(`✅ API response status: ${response.status}`);
    
    return response.data;
  } catch (error) {
    console.error(`❌ API GET request failed:`, error.message);
    
    if (error.response) {
      console.error(`📊 Error response status: ${error.response.status}`);
      console.error(`📄 Error response data:`, error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error(`📡 No response received:`, error.request);
      throw new Error('No response received from API');
    } else {
      console.error(`⚙️ Request setup error:`, error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Use the search routes
app.use('/api', searchRoutes);
app.use('/api', profileRoutes);
app.use('/api', mediaRoutes);
// ===== Other Endpoints (To be refactored later) =====

// Influencer Profile


// Media endpoint


app.get('/image-proxy', async (req, res) => {
  // Step 1: Get the Instagram URL from the query parameter
  const imageUrl = req.query.url;

  // Basic error checking
  if (!imageUrl) {
    return res.status(400).send('Error: Image URL parameter is missing.');
  }

  try {
    // Step 2: Ask Axios to download the image as raw binary data ('arraybuffer')
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer' 
    });

    // Step 3: Tell the browser what type of image this is (e.g., image/jpeg)
    // We copy this directly from the original Instagram response.
    res.set('Content-Type', imageResponse.headers['content-type']);

    // Send the raw image data back to the browser.
    res.send(imageResponse.data);

  } catch (error) {
    console.error("Error in image proxy:", error.message);
    res.status(500).send('Error: Failed to fetch the image.');
  }
});


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /health',
      'POST /api/search', // Updated route
      'GET /api/profile',
      'GET /media?id=<id>',
      'GET /image-proxy?url=<encoded_image_url>'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 ================================');
  console.log(`🚀 IG Analytics API Server Started`);
  console.log('🚀 ================================');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 RapidAPI Host (default): ${RAPIDAPI_HOST}`);
  console.log('🚀 ================================');
  console.log('📋 Available endpoints:');
  console.log('  GET  /health');
  console.log('  POST /api/search'); // Updated route
  console.log('  GET  /api/profile');
  console.log('  GET  /api/media');
  console.log('  GET  /image-proxy?url=<encoded_image_url>');
  console.log('🚀 ================================');
});

module.exports = app;