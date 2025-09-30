import { useState } from 'react'
import { Heart, MessageCircle, ExternalLink, Image as ImageIcon, X } from 'lucide-react'
import { formatNumber, truncateText, generateGradient, getImageProxyUrl } from '../utils/helpers'

const PostCard = ({ post, onClick }) => {
  const [imageError, setImageError] = useState(false)
  const gradientClass = generateGradient()

  return (
    <div 
      className="card cursor-pointer hover:scale-105 transition-all duration-300 group"
      onClick={() => onClick && onClick(post)}
    >
      {/* Post Image */}
      <div className="relative mb-4 aspect-square rounded-xl overflow-hidden bg-slate-950">
        {imageError ? (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <ImageIcon className="h-16 w-16 text-white opacity-50" />
          </div>
        ) : (
          <img
            src={getImageProxyUrl(post.displayUrl)}
            alt={post.caption?.substring(0, 50) || 'Instagram Post'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Post Type Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-xl shadow-lg">
          {post.type === 'carousel_album' ? 'Carousel' : 'Post'}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-xl rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
            <ExternalLink className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-3">
        {/* Caption */}
        {post.caption && (
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
            {truncateText(post.caption, 120)}
          </p>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-red-400 font-medium">
              <Heart className="h-4 w-4 fill-current" />
              <span>{formatNumber(post.likes || 0)}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-blue-400 font-medium">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(post.comments || 0)}</span>
            </div>
          </div>
          
          {post.interactions && (
            <div className="text-slate-500 text-xs">
              <span className="text-slate-600">Total: </span>
              <span className="font-bold text-indigo-400">{formatNumber(post.interactions)}</span>
            </div>
          )}
        </div>

        {/* Post URL Link */}
        {post.postUrl && (
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors font-medium group/link"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            <span>View on Instagram</span>
          </a>
        )}
      </div>
    </div>
  )
}

const PostModal = ({ post, onClose }) => {
  if (!post) return null

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
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Post Details
            </h3>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Post Content */}
          <div className="space-y-6">
            {post.caption && (
              <div>
                <h4 className="font-bold text-white mb-3 text-lg">Caption:</h4>
                <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {post.caption}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-red-400 mr-2" />
                  Engagement
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Likes:</span>
                    <span className="font-bold text-red-400">{formatNumber(post.likes || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Comments:</span>
                    <span className="font-bold text-blue-400">{formatNumber(post.comments || 0)}</span>
                  </div>
                  {post.interactions && (
                    <div className="flex justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Total:</span>
                      <span className="font-bold text-indigo-400">{formatNumber(post.interactions)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 text-purple-400 mr-2" />
                  Post Info
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="font-medium text-purple-400 capitalize">
                      {post.type?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Post ID:</span>
                    <span className="font-mono text-xs text-slate-500">
                      {post.postId?.substring(0, 10)}...
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {post.postUrl && (
              <div className="pt-4">
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Instagram</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const PostsGrid = ({ posts = [] }) => {
  const [selectedPost, setSelectedPost] = useState(null)

  if (posts.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 mb-6 border border-slate-700">
          <ImageIcon className="h-10 w-10 text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Posts Available</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          This influencer hasn't shared any recent posts or the data is not available.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <PostCard 
            key={post.postId || index} 
            post={post} 
            onClick={setSelectedPost}
          />
        ))}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </>
  )
}

export default PostsGrid
