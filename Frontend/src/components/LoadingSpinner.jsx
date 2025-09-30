import { Loader, Instagram, Sparkles } from 'lucide-react'

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center fade-in">
        <div className="relative mb-10 inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative">
            <Instagram className="h-20 w-20 text-indigo-400 mx-auto" />
            <Sparkles className="absolute top-0 right-0 h-6 w-6 text-purple-400 animate-pulse" />
            <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin h-10 w-10 text-purple-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
          Loading Profile
        </h2>
        <p className="text-slate-400 text-lg mb-8">{message}</p>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
