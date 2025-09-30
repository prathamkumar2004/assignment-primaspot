import { useState } from 'react'
import { Heart, MessageCircle, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { formatNumber, truncateText, generateGradient } from '../utils/helpers'

const PostCard = ({ post, onClick }) => {
  const [imageError, setImageError] = useState(false)
  const gradientClass = generateGradient()

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-all duration-300 group"
      onClick={() => onClick && onClick(post)}
    >
      {/* Post Image Placeholder */}
      <div className="relative mb-4 aspect-square rounded-lg overflow-hidden bg-gray-100">
        {imageError ? (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <ImageIcon className="h-12 w-12 text-white opacity-70" />
          </div>
        ) : (
          <img
            src={`http://localhost:5001/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
            alt={post.caption?.substring(0, 50) || 'Instagram Post'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Post Type Badge */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {post.type === 'carousel_album' ? 'Carousel' : 'Post'}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-3">
        {/* Caption */}
        {post.caption && (
          <p className="text-gray-700 text-sm leading-relaxed">
            {truncateText(post.caption, 120)}
          </p>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-red-500">
              <Heart className="h-4 w-4" />
              <span className="font-medium">{formatNumber(post.likes || 0)}</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{formatNumber(post.comments || 0)}</span>
            </div>
          </div>
          
          {post.interactions && (
            <div className="text-gray-500">
              <span className="text-xs">Total: </span>
              <span className="font-medium">{formatNumber(post.interactions)}</span>
            </div>
          )}
        </div>

        {/* Post URL Link */}
        {post.postUrl && (
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">Post Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Post Content */}
          <div className="space-y-4">
            {post.caption && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Caption:</h4>
                <p className="text-gray-700 leading-relaxed">{post.caption}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Engagement:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Likes:</span>
                    <span className="font-medium">{formatNumber(post.likes || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comments:</span>
                    <span className="font-medium">{formatNumber(post.comments || 0)}</span>
                  </div>
                  {post.interactions && (
                    <div className="flex justify-between">
                      <span>Total Interactions:</span>
                      <span className="font-medium">{formatNumber(post.interactions)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Post Info:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{post.type?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Post ID:</span>
                    <span className="font-mono text-xs">{post.postId?.substring(0, 10)}...</span>
                  </div>
                </div>
              </div>
            </div>
            
            {post.postUrl && (
              <div className="pt-4 border-t">
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
      <div className="card text-center py-12">
        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Posts Available</h3>
        <p className="text-gray-600">This influencer hasn't shared any recent posts or the data is not available.</p>
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