import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
