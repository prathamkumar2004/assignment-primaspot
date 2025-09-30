const axios = require('axios');

// Request headers for RapidAPI
const getHeaders = (host) => ({
  'x-rapidapi-key': process.env.RAPIDAPI_KEY,
  'x-rapidapi-host': host,
});

// Utility function for making POST API requests
const makeApiPostRequest = async (url, data, host) => {
  try {
    console.log(`🚀 Making POST request to: ${url}`);
    console.log(`📋 Request body:`, data);
    const headers = {
      ...getHeaders(host),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    console.log(`🔑 Headers:`, headers);

    const response = await axios.post(url, new URLSearchParams(data), {
      headers,
      timeout: 30000 // 30 second timeout
    });

    console.log(`✅ API response status: ${response.status}`);
    
    return response.data;
  } catch (error) {
    console.error(`❌ API POST request failed:`, error.message);
    
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

module.exports = { makeApiPostRequest };