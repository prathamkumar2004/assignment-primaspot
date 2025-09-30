// Format numbers for display (e.g., 1000 -> 1K, 1000000 -> 1M)
export const formatNumber = (num) => {
  if (!num) return '0'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format engagement rate as percentage
export const formatEngagementRate = (rate) => {
  if (!rate) return '0%'
  return `${(rate * 100).toFixed(1)}%`
}

// Truncate text to specified length
export const truncateText = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Generate random gradient for placeholder images
export const generateGradient = () => {
  const colors = [
    'from-purple-400 to-pink-400',
    'from-blue-400 to-blue-600',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500',
    'from-indigo-400 to-purple-600'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Calculate engagement rate
export const calculateEngagementRate = (likes, comments, followers) => {
  if (!followers || followers === 0) return 0
  return ((likes + comments) / followers) * 100
}

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Validate URL
export const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Extract hashtags from text
export const extractHashtags = (text) => {
  if (!text) return []
  const hashtags = text.match(/#[a-zA-Z0-9_]+/g)
  return hashtags || []
}

// Get image placeholder URL
export const getPlaceholderImage = (width = 400, height = 400) => {
  return `https://via.placeholder.com/${width}x${height}/f0f0f0/666666?text=No+Image`
}

// Get API base URL (environment-aware)
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
}

// Get image proxy URL
export const getImageProxyUrl = (imageUrl) => {
  if (!imageUrl) return getPlaceholderImage()
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}/image-proxy?url=${encodeURIComponent(imageUrl)}`
}