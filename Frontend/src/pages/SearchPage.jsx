import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Users, Instagram, Loader } from 'lucide-react'
import { igAPI } from '../services/api'
import { formatNumber } from '../utils/helpers'
import { useDebounce } from '../hooks/useDebounce'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const debouncedQuery = useDebounce(query, 500)

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const data = await igAPI.searchInfluencers(searchQuery)
      setResults(data || [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search influencers')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery)
    } else {
      setResults([])
      setHasSearched(false)
    }
  }, [debouncedQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">IG Analytics</h1>
            </div>
            <p className="text-sm text-gray-600">Discover Instagram Influencer Insights</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Instagram Influencers
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search for Instagram profiles and get detailed analytics and insights
          </p>

          {/* Search Form */}
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Instagram username..."
                className="input-field pl-10 pr-4 py-3 text-lg"
                disabled={loading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && !loading && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              {results.length > 0 ? `Found ${results.length} results` : 'No results found'}
            </h3>

            {results.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((influencer) => (
                  <Link
                    key={influencer.id}
                    to={`/profile/${influencer.screenName}`}
                    className="card hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:5001/image-proxy?url=${encodeURIComponent(influencer.image)}`}
                          alt={influencer.name}
                          className="w-16 h-16 rounded-full object-cover bg-gray-200"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {influencer.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          @{influencer.screenName}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Click to view profile</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {results.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No influencers found for "{query}". Try a different search term.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Searching for influencers...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default SearchPage