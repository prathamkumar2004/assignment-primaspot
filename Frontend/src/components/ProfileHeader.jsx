import { Users, Heart, MessageCircle, TrendingUp, Instagram, Sparkles } from 'lucide-react'
import { formatNumber, formatEngagementRate, getImageProxyUrl } from '../utils/helpers'

const ProfileHeader = ({ profile }) => {
  if (!profile) return null

  const stats = [
    {
      label: 'Followers',
      value: formatNumber(profile.followersCount),
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      label: 'Avg Likes',
      value: formatNumber(profile.avgLikes),
      icon: Heart,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-500/30'
    },
    {
      label: 'Avg Comments',
      value: formatNumber(profile.avgComments),
      icon: MessageCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      label: 'Engagement Rate',
      value: formatEngagementRate(profile.avgER),
      icon: TrendingUp,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/30'
    }
  ]

  return (
    <div className="card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50"></div>
            <img
              src={getImageProxyUrl(profile.image)}
              alt={profile.name}
              className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-full object-cover mx-auto lg:mx-0 ring-4 ring-slate-700 shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150/1f2937/6366f1?text=IG'
              }}
            />
            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2 shadow-lg">
              <Instagram className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {profile.name}
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <Instagram className="h-5 w-5 text-slate-500" />
              <p className="text-xl text-slate-400">@{profile.username}</p>
            </div>
            {profile.description && (
              <p className="text-slate-300 max-w-3xl leading-relaxed text-lg">
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
                  className={`stat-card group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex items-center justify-center mb-3 p-2 bg-gradient-to-br ${stat.bgGradient} rounded-lg border ${stat.borderColor}`}>
                    <IconComponent className={`h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`} />
                  </div>
                  <div className={`text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Video Stats (if available) */}
          {(profile.avgVideoLikes || profile.avgVideoComments || profile.avgVideoViews) && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-5">
                Video Performance
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {profile.avgVideoViews && (
                  <div className="stat-card text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {formatNumber(profile.avgVideoViews)}
                    </div>
                    <div className="text-sm text-slate-500">Avg Views</div>
                  </div>
                )}
                {profile.avgVideoLikes && (
                  <div className="stat-card text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {formatNumber(profile.avgVideoLikes)}
                    </div>
                    <div className="text-sm text-slate-500">Avg Video Likes</div>
                  </div>
                )}
                {profile.avgVideoComments && (
                  <div className="stat-card text-center">
                    <div className="text-2xl font-bold text-indigo-400 mb-1">
                      {formatNumber(profile.avgVideoComments)}
                    </div>
                    <div className="text-sm text-slate-500">Avg Video Comments</div>
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
