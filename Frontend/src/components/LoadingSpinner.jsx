import { Loader, Instagram } from 'lucide-react'

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Instagram className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin h-8 w-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Profile</h2>
        <p className="text-gray-600">{message}</p>
        <div className="mt-6">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner