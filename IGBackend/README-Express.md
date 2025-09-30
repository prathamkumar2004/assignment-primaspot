# Instagram Influencer Analytics - Express.js Backend

A robust Node.js/Express.js backend API for Instagram influencer analytics, providing endpoints for searching influencers, retrieving profile data, and analyzing posts/reels.

## 🚀 Features

- **Search Influencers**: Search for Instagram profiles by username
- **Profile Analytics**: Get detailed influencer profile information and metrics
- **Posts & Reels Data**: Retrieve recent posts and reels with engagement metrics
- **Comprehensive Logging**: Detailed request/response logging for debugging
- **Error Handling**: Robust error handling with meaningful error messages
- **Security**: Built-in security headers using Helmet.js
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend integration
- **Health Check**: Health monitoring endpoint

## 📋 API Endpoints

### Health Check

```
GET /health
```

Returns server status and uptime information.

### Search Influencers

```
GET /search?username=<username>&page=1&per_page=10&sort=-score&social_types=INST
```

**Parameters:**

- `username` (required): Instagram username to search for
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Results per page (default: 10)
- `sort` (optional): Sort order (default: "-score")
- `social_types` (optional): Social media type (default: "INST")

### Get Influencer Profile

```
GET /community?cid=<cid>
```

**Parameters:**

- `cid` (required): Community ID obtained from search results

### Get Posts and Reels

```
GET /posts?cid=<cid>
```

**Parameters:**

- `cid` (required): Community ID obtained from search results

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- RapidAPI account with Instagram API access

### 1. Install Dependencies

```bash
cd IGBackend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the IGBackend directory:

```env
# RapidAPI Configuration
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=your_rapidapi_host_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Start the Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📊 Response Formats

### Search Response

```json
[
  {
    "cid": "INST:17841470279327011",
    "name": "Influencer Name",
    "image": "https://profile-image-url",
    "screenName": "username"
  }
]
```

### Profile Response

```json
{
  "name": "Influencer Name",
  "image": "https://profile-image-url",
  "description": "Profile description",
  "username": "username",
  "followersCount": 150000,
  "avgER": 0.045,
  "avgLikes": 5000,
  "avgComments": 200,
  "avgVideoLikes": 8000,
  "avgVideoComments": 300,
  "avgVideoViews": 50000
}
```

### Posts Response

```json
{
  "POSTS": [
    {
      "postId": "post_id_here",
      "type": "carousel_album",
      "postUrl": "https://instagram-post-url",
      "caption": "Post caption text",
      "likes": 5000,
      "comments": 200,
      "interactions": 5200
    }
  ],
  "REELS": [
    {
      "postId": "reel_id_here",
      "type": "REELS",
      "postUrl": "https://instagram-reel-url",
      "caption": "Reel caption text",
      "likes": 8000,
      "comments": 300,
      "interactions": 8300
    }
  ]
}
```

## 🔧 Configuration

### Environment Variables

- `RAPIDAPI_KEY`: Your RapidAPI key for Instagram API access
- `RAPIDAPI_HOST`: RapidAPI host for the Instagram API
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

### Security Features

- **Helmet.js**: Adds security headers
- **CORS**: Configurable cross-origin resource sharing
- **Request Timeout**: 30-second timeout for API requests
- **Input Validation**: Parameter validation for all endpoints

## 🐛 Debugging & Logging

The server includes comprehensive logging:

- **Request Logging**: All incoming requests with parameters
- **API Requests**: Detailed logging of external API calls
- **Response Logging**: API response status and data
- **Error Logging**: Detailed error messages and stack traces

### Log Levels

- `🚀` - Server startup and configuration
- `🔍` - Search endpoint activities
- `👥` - Community endpoint activities
- `📝` - Posts endpoint activities
- `✅` - Successful operations
- `❌` - Errors and failures
- `📋` - Data processing information

## 🔄 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found (invalid route)
- `500` - Internal Server Error

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name ig-analytics-api
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📈 Performance

- **Request Timeout**: 30 seconds for external API calls
- **Concurrent Requests**: Supports multiple simultaneous requests
- **Memory Usage**: Efficient memory management with proper garbage collection
- **Error Recovery**: Graceful error handling prevents server crashes

## 🔒 Security Considerations

1. **API Keys**: Store RapidAPI credentials securely in environment variables
2. **Rate Limiting**: Consider implementing rate limiting for production use
3. **Input Sanitization**: All user inputs are validated
4. **CORS**: Configure CORS settings for your specific frontend domain
5. **HTTPS**: Use HTTPS in production environments

## 🤝 Integration with Frontend

The Express backend is designed to work seamlessly with the React frontend:

1. **CORS Enabled**: Allows requests from the frontend
2. **Consistent API**: Same endpoint structure as the original Flask version
3. **Error Responses**: Frontend-friendly error messages
4. **JSON Format**: All responses in JSON format

### Frontend Configuration

Update the frontend API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:5000";
```

## 📊 Monitoring

### Health Check Endpoint

Monitor server health using the `/health` endpoint:

```bash
curl http://localhost:5000/health
```

### Server Logs

Monitor server logs for debugging:

```bash
npm run dev  # Shows detailed logs in development
```

---

**Built with Node.js, Express.js, and ❤️ for Instagram Influencer Analytics**
