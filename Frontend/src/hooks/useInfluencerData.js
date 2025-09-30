import { useState, useEffect } from 'react'
import { igAPI } from '../services/api'

export const useInfluencerData = (id) => {
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [profileData, mediaData] = await Promise.all([
          igAPI.getInfluencerProfile(id),
          igAPI.getInfluencerMedia(id)
        ])

        setProfile(profileData)
        setPosts(mediaData)
      } catch (err) {
        setError(err.message || 'Failed to fetch influencer data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const refetch = async () => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const [profileData, mediaData] = await Promise.all([
        igAPI.getInfluencerProfile(id),
        igAPI.getInfluencerMedia(id)
      ])

      setProfile(profileData)
      setPosts(mediaData)
    } catch (err) {
      setError(err.message || 'Failed to fetch influencer data')
    } finally {
      setLoading(false)
    }
  }

  return { profile, posts, loading, error, refetch }
}

export default useInfluencerData