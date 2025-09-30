import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Heart, MessageCircle, Eye, Loader, AlertCircle, Instagram, Sparkles } from 'lucide-react'
import { useInfluencerData } from '../hooks/useInfluencerData'
import ProfileHeader from '../components/ProfileHeader'
import AnalyticsCharts from '../components/AnalyticsCharts'
import PostsGrid from '../components/PostsGrid'
import ReelsGrid from '../components/ReelsGrid'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfilePage = () => {
  const { username } = useParams()
  const {
    profile,
    media,
    loading,
    error,
    pagination,
    loadingMore,
    fetchMoreMedia,
  } = useInfluencerData(username)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card max-w-md fade-in">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Error Loading Profile</h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card max-w-md fade-in">
          <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Profile Not Found</h2>
          <p className="text-slate-400 mb-8">The requested influencer profile could not be found.</p>
          <Link to="/" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-slate-400 hover:text-indigo-400 transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Search</span>
              </Link>
              <div className="hidden sm:flex items-center space-x-2">
                <Instagram className="h-6 w-6 text-indigo-400" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  IG Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10 fade-in">
          {/* Profile Header */}
          <ProfileHeader profile={profile} />

          {/* Analytics Charts */}
          <AnalyticsCharts profile={profile} media={media} />

          {/* Posts and Reels Sections */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Posts Grid */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg border border-red-500/30">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
              </div>
              <PostsGrid posts={media?.posts || []} />
            </div>

            {/* Reels Grid */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg border border-purple-500/30">
                  <Eye className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Recent Reels</h2>
              </div>
              <ReelsGrid reels={media?.reels || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
