const { makeApiPostRequest } = require('../utils/api.js')

// The host for this endpoint is the same as the search endpoint
const RAPIDAPI_HOST_PROFILE = 'instagram-scraper-stable-api.p.rapidapi.com'

const getProfileByUsername = async (req, res) => {
  try {
    console.log(`👤 Profile endpoint called with body:`, req.body)

    const { username } = req.body

    if (!username) {
      console.log('❌ Error: Username is missing in the body')
      return res.status(400).json({ error: 'Username is required in the body' })
    }

    console.log(`👤 Fetching profile for: username=${username}`)

    // Fetch profile data
    const profileUrl = `https://${RAPIDAPI_HOST_PROFILE}/ig_get_fb_profile_v3.php`
    const profilePayload = { username_or_url: username }
    const profileData = await makeApiPostRequest(
      profileUrl,
      profilePayload,
      RAPIDAPI_HOST_PROFILE
    )
    console.log(`📋 Profile API response received.`)

    // Fetch media data for engagement calculation
    const mediaUrl = `https://${RAPIDAPI_HOST_PROFILE}/get_ig_user_posts.php`
    const mediaPayload = { username_or_url: username, amount: 20 } // Fetch recent 20 posts for calculation
    const mediaData = await makeApiPostRequest(
      mediaUrl,
      mediaPayload,
      RAPIDAPI_HOST_PROFILE
    )
    console.log(`📋 Media API response for analytics received.`)

    const posts = mediaData.posts || []
    let totalLikes = 0
    let totalComments = 0
    const postCount = posts.length

    if (postCount > 0) {
      posts.forEach((post) => {
        totalLikes += post.node.like_count || 0
        totalComments += post.node.comment_count || 0
      })
    }

    const avgLikes = postCount > 0 ? totalLikes / postCount : 0
    const avgComments = postCount > 0 ? totalComments / postCount : 0
    const followers = profileData.follower_count || 0
    const avgER =
      followers > 0 && postCount > 0
        ? (totalLikes + totalComments) / postCount / followers
        : 0

    // Filter the extensive response to send only what the frontend needs
    const filteredData = {
      id: profileData.pk,
      username: profileData.username,
      name: profileData.full_name,
      image: profileData.profile_pic_url,
      description: profileData.biography,
      followersCount: followers,
      followingCount: profileData.following_count,
      postsCount: profileData.media_count,
      is_verified: profileData.is_verified,
      is_private: profileData.is_private,
      external_url: profileData.external_url,
      category: profileData.category,
      bio_links: profileData.bio_links || [],
      // Add calculated engagement stats
      avgLikes: Math.round(avgLikes),
      avgComments: Math.round(avgComments),
      avgER: avgER,
    }

    console.log(`✅ Filtered profile data with analytics:`, filteredData)
    res.json(filteredData)
  } catch (error) {
    console.error(`❌ Profile endpoint error:`, error.message)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

module.exports = {
  getProfileByUsername,
}
