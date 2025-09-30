import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || `https://${window.location.hostname}:3001`

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)
  console.log('Request params:', config.params)
  return config
})

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status)
    console.log('Response data:', response.data)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    if (error.response) {
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
    throw error
  }
)

export const igAPI = {
  // Search for influencers
  searchInfluencers: async (username) => {
    console.log('Searching for username:', username)
    
    const body = {
      username,
    }
    
    console.log('Final body being sent:', body)
    
    try {
      const response = await api.post('/api/search', body)
      console.log('Search response received:', response.data)
      return response.data
    } catch (error) {
      console.error('Search API error:', error)
      throw error
    }
  },

  // Get influencer profile data
  getInfluencerProfile: async (username) => {
    console.log('Fetching profile for username:', username)
    try {
      const response = await api.post('/api/profile', { username })
      console.log('Profile response received:', response.data)
      return response.data
    } catch (error) {
      console.error('Profile API error:', error)
      throw error
    }
  },

  // Get influencer posts and reels
  getInfluencerMedia: async (username, nextMaxId) => {
    console.log(
      'Fetching media for username:',
      username,
      'with next_max_id:',
      nextMaxId
    )
    try {
      const response = await api.post('/api/media', {
        username,
        next_max_id: nextMaxId,
      })
      console.log('Media response received:', response.data)
      return response.data
    } catch (error) {
      console.error('Media API error:', error)
      throw error
    }
  },
}

export default api