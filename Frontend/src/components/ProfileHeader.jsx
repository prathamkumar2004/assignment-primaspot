import { Users, Heart, MessageCircle, TrendingUp, Instagram } from 'lucide-react'
import { formatNumber, formatEngagementRate } from '../utils/helpers'

const ProfileHeader = ({ profile }) => {
  if (!profile) return null

  const stats = [
    {
      label: 'Followers',
      value: formatNumber(profile.followersCount),
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Avg Likes',
      value: formatNumber(profile.avgLikes),
      icon: Heart,
      color: 'text-red-500'
    },
    {
      label: 'Avg Comments',
      value: formatNumber(profile.avgComments),
      icon: MessageCircle,
      color: 'text-green-500'
    },
    {
      label: 'Engagement Rate',
      value: formatEngagementRate(profile.avgER),
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:5001/image-proxy?url=${encodeURIComponent(profile.image)}`}
            alt={profile.name}
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mx-auto lg:mx-0 shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150'
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {profile.name}
            </h1>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <Instagram className="h-5 w-5 text-gray-400" />
              <p className="text-xl text-gray-600">@{profile.username}</p>
            </div>
            {profile.description && (
              <p className="text-gray-700 max-w-2xl leading-relaxed">
                {profile.description}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Video Stats (if available) */}
          {(profile.avgVideoLikes || profile.avgVideoComments || profile.avgVideoViews) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Performance</h3>
              <div className="grid grid-cols-3 gap-4">
                {profile.avgVideoViews && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {formatNumber(profile.avgVideoViews)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Views</div>
                  </div>
                )}
                {profile.avgVideoLikes && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {formatNumber(profile.avgVideoLikes)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Video Likes</div>
                  </div>
                )}
                {profile.avgVideoComments && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {formatNumber(profile.avgVideoComments)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Video Comments</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader