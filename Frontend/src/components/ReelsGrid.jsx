import { useState } from 'react'
import { Heart, MessageCircle, Eye, ExternalLink, Play, Video } from 'lucide-react'
import { formatNumber, truncateText, generateGradient } from '../utils/helpers'

const ReelCard = ({ reel, onClick }) => {
  const gradientClass = generateGradient()

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-all duration-300 group"
      onClick={() => onClick && onClick(reel)}
    >
      {/* Reel Thumbnail */}
      <div className="relative mb-4 aspect-[9/16] rounded-lg overflow-hidden bg-gray-100 max-h-80">
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <div className="text-center">
            <Play className="h-16 w-16 text-white opacity-70 mx-auto mb-2" />
            <Video className="h-8 w-8 text-white opacity-50 mx-auto" />
          </div>
        </div>
        
        {/* Reel Badge */}
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          REEL
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="h-6 w-6 text-gray-800" />
          </div>
        </div>
      </div>

      {/* Reel Content */}
      <div className="space-y-3">
        {/* Caption */}
        {reel.caption && (
          <p className="text-gray-700 text-sm leading-relaxed">
            {truncateText(reel.caption, 100)}
          </p>
        )}

        {/* Engagement Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-purple-600">
                <Eye className="h-4 w-4" />
                <span className="font-medium">{formatNumber(reel.views || 0)}</span>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="h-4 w-4" />
                <span className="font-medium">{formatNumber(reel.likes || 0)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{formatNumber(reel.comments || 0)}</span>
            </div>
            
            {reel.interactions && (
              <div className="text-gray-500">
                <span className="text-xs">Total: </span>
                <span className="font-medium">{formatNumber(reel.interactions)}</span>
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
            className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">Reel Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Reel Content */}
          <div className="space-y-4">
            {reel.caption && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Caption:</h4>
                <p className="text-gray-700 leading-relaxed">{reel.caption}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Stats:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Views:</span>
                    <span className="font-medium">{formatNumber(reel.views || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Likes:</span>
                    <span className="font-medium">{formatNumber(reel.likes || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comments:</span>
                    <span className="font-medium">{formatNumber(reel.comments || 0)}</span>
                  </div>
                  {reel.interactions && (
                    <div className="flex justify-between">
                      <span>Total Interactions:</span>
                      <span className="font-medium">{formatNumber(reel.interactions)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Reel Info:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">Reel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Post ID:</span>
                    <span className="font-mono text-xs">{reel.postId?.substring(0, 10)}...</span>
                  </div>
                  {reel.views && reel.likes && (
                    <div className="flex justify-between">
                      <span>Engagement Rate:</span>
                      <span className="font-medium">
                        {((reel.likes / reel.views) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {reel.postUrl && (
              <div className="pt-4 border-t">
                <a
                  href={reel.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
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
      <div className="card text-center py-12">
        <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reels Available</h3>
        <p className="text-gray-600">This influencer hasn't shared any recent reels or the data is not available.</p>
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