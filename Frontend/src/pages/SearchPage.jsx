import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Users, Instagram, Loader, Sparkles } from 'lucide-react'
import { igAPI } from '../services/api'
import { formatNumber, getImageProxyUrl } from '../utils/helpers'
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Instagram className="h-10 w-10 text-indigo-400" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-purple-400 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                IG Analytics
              </h1>
            </div>
            <p className="text-sm text-slate-400 hidden sm:block">
              Discover Instagram Influencer Insights
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm text-indigo-300 font-medium">Powered by Advanced Analytics</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Instagram
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"> Influencers</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Search for Instagram profiles and get detailed analytics, engagement metrics, and powerful insights
          </p>

          {/* Search Form */}
          <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Instagram username..."
                  className="input-field pl-14 pr-6 py-5 text-lg w-full"
                  disabled={loading}
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-xl fade-in">
            <p className="text-red-400 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && !loading && (
          <div className="space-y-8 fade-in">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                {results.length > 0 ? `Found ${results.length} results` : 'No results found'}
              </h3>
              {results.length > 0 && (
                <p className="text-slate-400">Click on any profile to view detailed analytics</p>
              )}
            </div>

            {results.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((influencer, index) => (
                  <Link
                    key={influencer.cid || index}
                    to={`/profile/${influencer.screenName}`}
                    className="card group hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                        <img
                          src={getImageProxyUrl(influencer.image)}
                          alt={influencer.name}
                          className="relative w-16 h-16 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-indigo-500 transition-all duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150/1f2937/6366f1?text=IG'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                          {influencer.name}
                        </h4>
                        <p className="text-sm text-slate-400 mb-3 truncate">
                          @{influencer.screenName}
                        </p>
                        <div className="flex items-center text-sm text-indigo-400 font-medium">
                          <Users className="h-4 w-4 mr-1" />
                          <span>View Profile</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {results.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 mb-6 border border-slate-700">
                  <Users className="h-12 w-12 text-slate-600" />
                </div>
                <p className="text-slate-400 text-xl mb-2">
                  No influencers found for "{query}"
                </p>
                <p className="text-slate-500">
                  Try a different search term or check the spelling
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 fade-in">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Loader className="relative animate-spin h-16 w-16 text-indigo-400" />
            </div>
            <p className="text-slate-300 text-xl font-medium mb-2">Searching for influencers...</p>
            <p className="text-slate-500">This may take a few seconds</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default SearchPage
