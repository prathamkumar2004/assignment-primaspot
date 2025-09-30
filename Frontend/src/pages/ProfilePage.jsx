import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Heart, MessageCircle, Eye, Loader, AlertCircle, Instagram } from 'lucide-react'
import { useInfluencerData } from '../hooks/useInfluencerData'
import ProfileHeader from '../components/ProfileHeader'
import AnalyticsCharts from '../components/AnalyticsCharts'
import PostsGrid from '../components/PostsGrid'
import ReelsGrid from '../components/ReelsGrid'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfilePage = () => {
  const { id } = useParams()
  const { profile, posts, loading, error } = useInfluencerData(id)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The requested influencer profile could not be found.</p>
          <Link to="/" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Search</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Instagram className="h-6 w-6 text-purple-600" />
                <span className="font-semibold text-gray-900">IG Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader profile={profile} />

          {/* Analytics Charts */}
          <AnalyticsCharts profile={profile} posts={posts} />

          {/* Posts and Reels Sections */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Posts Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-500" />
                Recent Posts
              </h2>
              <PostsGrid posts={posts?.POSTS || []} />
            </div>

            {/* Reels Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-purple-500" />
                Recent Reels
              </h2>
              <ReelsGrid reels={posts?.REELS || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage