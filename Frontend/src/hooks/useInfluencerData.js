import { useState, useEffect, useCallback, useRef } from 'react'
import { igAPI } from '../services/api'

export const useInfluencerData = (username) => {
  const [profile, setProfile] = useState(null)
  const [media, setMedia] = useState({ posts: [], reels: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    next_max_id: null,
    has_next_page: false,
  })
  const [loadingMore, setLoadingMore] = useState(false)
  const hasFetched = useRef(false)

  const fetchInitialData = useCallback(async () => {
    if (!username || hasFetched.current) return

    hasFetched.current = true
    setLoading(true)
    setError(null)

    try {
      const [profileData, initialMediaData] = await Promise.all([
        igAPI.getInfluencerProfile(username),
        igAPI.getInfluencerMedia(username),
      ])

      setProfile(profileData)
      setMedia({
        posts: initialMediaData.POSTS || [],
        reels: initialMediaData.REELS || [],
      })
      setPagination({
        next_max_id: initialMediaData.next_max_id,
        has_next_page: initialMediaData.has_next_page,
      })
    } catch (err) {
      setError(err.message || 'Failed to fetch initial influencer data')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  const fetchMoreMedia = useCallback(async () => {
    if (!username || !pagination.has_next_page || loadingMore) return

    setLoadingMore(true)
    try {
      const moreMediaData = await igAPI.getInfluencerMedia(
        username,
        pagination.next_max_id
      )
      setMedia((prevMedia) => ({
        posts: [...prevMedia.posts, ...(moreMediaData.POSTS || [])],
        reels: [...prevMedia.reels, ...(moreMediaData.REELS || [])],
      }))
      setPagination({
        next_max_id: moreMediaData.next_max_id,
        has_next_page: moreMediaData.has_next_page,
      })
    } catch (err) {
      setError(err.message || 'Failed to fetch more media')
    } finally {
      setLoadingMore(false)
    }
  }, [username, pagination.has_next_page, pagination.next_max_id, loadingMore])

  return {
    profile,
    media,
    loading,
    error,
    pagination,
    loadingMore,
    fetchMoreMedia,
    refetch: fetchInitialData,
  }
}

export default useInfluencerData