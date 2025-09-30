import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
