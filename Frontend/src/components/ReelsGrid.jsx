import { useState } from 'react'
import { Heart, MessageCircle, Eye, ExternalLink, Play, Video, X } from 'lucide-react'
import { formatNumber, truncateText, generateGradient, getImageProxyUrl } from '../utils/helpers'

const ReelCard = ({ reel, onClick }) => {
  const gradientClass = generateGradient()

  return (
    <div 
      className="card cursor-pointer hover:scale-105 transition-all duration-300 group"
      onClick={() => onClick && onClick(reel)}
    >
      {/* Reel Thumbnail */}
      <div className="relative mb-4 aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 max-h-80">
        <img
          src={getImageProxyUrl(reel.thumbnail)}
          alt={reel.caption?.substring(0, 50) || 'Instagram Reel'}
          className="w-full h-full object-cover"
        />
        
        {/* Reel Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-xl shadow-lg flex items-center space-x-1">
          <Play className="h-3 w-3 fill-current" />
          <span>REEL</span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-xl rounded-full p-5 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="h-8 w-8 text-white fill-current" />
          </div>
        </div>
      </div>

      {/* Reel Content */}
      <div className="space-y-3">
        {/* Caption */}
        {reel.caption && (
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
            {truncateText(reel.caption, 100)}
          </p>
        )}

        {/* Engagement Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-purple-400 font-medium">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(reel.views || 0)}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-red-400 font-medium">
                <Heart className="h-4 w-4 fill-current" />
                <span>{formatNumber(reel.likes || 0)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1.5 text-blue-400 font-medium">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(reel.comments || 0)}</span>
            </div>
            
            {reel.interactions && (
              <div className="text-slate-500 text-xs">
                <span className="text-slate-600">Total: </span>
                <span className="font-bold text-indigo-400">{formatNumber(reel.interactions)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Post URL Link */}
        {reel.postUrl && (
          <a
            href={reel.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-purple-400 hover:text-purple-300 text-sm transition-colors font-medium group/link"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            <span>Watch on Instagram</span>
          </a>
        )}
      </div>
    </div>
  )
}

const ReelModal = ({ reel, onClose }) => {
  if (!reel) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in"
      onClick={onClose}
    >
      <div 
        className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Reel Details
            </h3>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Reel Content */}
          <div className="space-y-6">
            {reel.caption && (
              <div>
                <h4 className="font-bold text-white mb-3 text-lg">Caption:</h4>
                <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {reel.caption}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 text-purple-400 mr-2" />
                  Video Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Views:</span>
                    <span className="font-bold text-purple-400">{formatNumber(reel.views || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Likes:</span>
                    <span className="font-bold text-red-400">{formatNumber(reel.likes || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Comments:</span>
                    <span className="font-bold text-blue-400">{formatNumber(reel.comments || 0)}</span>
                  </div>
                  {reel.interactions && (
                    <div className="flex justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Total:</span>
                      <span className="font-bold text-indigo-400">{formatNumber(reel.interactions)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Play className="h-5 w-5 text-pink-400 mr-2" />
                  Reel Info
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="font-medium text-pink-400">Reel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Post ID:</span>
                    <span className="font-mono text-xs text-slate-500">
                      {reel.postId?.substring(0, 10)}...
                    </span>
                  </div>
                  {reel.views && reel.likes && (
                    <div className="flex justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Engagement:</span>
                      <span className="font-bold text-emerald-400">
                        {((reel.likes / reel.views) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {reel.postUrl && (
              <div className="pt-4">
                <a
                  href={reel.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch on Instagram</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ReelsGrid = ({ reels = [] }) => {
  const [selectedReel, setSelectedReel] = useState(null)

  if (reels.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 mb-6 border border-slate-700">
          <Video className="h-10 w-10 text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Reels Available</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          This influencer hasn't shared any recent reels or the data is not available.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6">
        {reels.map((reel, index) => (
          <ReelCard 
            key={reel.postId || index} 
            reel={reel} 
            onClick={setSelectedReel}
          />
        ))}
      </div>

      {/* Reel Modal */}
      {selectedReel && (
        <ReelModal 
          reel={selectedReel} 
          onClose={() => setSelectedReel(null)} 
        />
      )}
    </>
  )
}

export default ReelsGrid
