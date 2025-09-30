const { makeApiPostRequest } = require('../utils/api.js');

// The host for this endpoint is the same as the search endpoint
const RAPIDAPI_HOST_PROFILE = 'instagram-scraper-stable-api.p.rapidapi.com';

const getProfileByUsername = async (req, res) => {
  try {
    console.log(`👤 Profile endpoint called with body:`, req.body);

    const { username } = req.body;

    if (!username) {
      console.log('❌ Error: Username is missing in the body');
      return res.status(400).json({ error: 'Username is required in the body' });
    }

    console.log(`👤 Fetching profile for: username=${username}`);

    const url = `https://${RAPIDAPI_HOST_PROFILE}/ig_get_fb_profile_v3.php`;
    const data = {
      username_or_url: username
    };

    const responseData = await makeApiPostRequest(url, data, RAPIDAPI_HOST_PROFILE);
    console.log(`📋 API response received.`);

    // Filter the extensive response to send only what the frontend needs
    const filteredData = {
      id: responseData.pk,
      username: responseData.username,
      name: responseData.full_name,
      image: responseData.profile_pic_url,
      description: responseData.biography,
      followersCount: responseData.follower_count,
      followingCount: responseData.following_count,
      postsCount: responseData.media_count,
      is_verified: responseData.is_verified,
      is_private: responseData.is_private,
      external_url: responseData.external_url,
      category: responseData.category,
      bio_links: responseData.bio_links || [], // Include bio links if they exist
    };
    
    console.log(`✅ Filtered profile data:`, filteredData);
    res.json(filteredData);

  } catch (error) {
    console.error(`❌ Profile endpoint error:`, error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  getProfileByUsername,
};