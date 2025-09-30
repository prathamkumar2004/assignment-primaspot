const { makeApiPostRequest } = require('../utils/api');

const RAPIDAPI_HOST_MEDIA = 'instagram-scraper-stable-api.p.rapidapi.com';

const getMediaByUsername = async (req, res) => {
  try {
    console.log(`📝 Media endpoint called with body:`, req.body);
    
    const { username, amount = 12, pagination_token } = req.body;
    
    if (!username) {
      console.log('❌ Error: Username is missing in the body');
      return res.status(400).json({ error: 'Username is required in the body' });
    }

    console.log(`📝 Fetching media for: username=${username}, amount=${amount}`);

    const url = `https://${RAPIDAPI_HOST_MEDIA}/get_ig_user_posts.php`;
    const data = {
      username_or_url: username,
      amount,
    };

    // If a pagination_token is provided, add it to the request data
    if (pagination_token) {
      console.log(`  ...with pagination_token: ${pagination_token}`);
      data.pagination_token = pagination_token;
    }

    const responseData = await makeApiPostRequest(url, data, RAPIDAPI_HOST_MEDIA);
    console.log(`📋 API response received.`);

    const postsData = responseData.posts || [];
    const newPaginationToken = responseData.pagination_token || null;
    
    console.log(`📊 Found ${postsData.length} media items.`);

    const posts = [];
    const reels = [];

    postsData.forEach((item) => {
      const node = item.node;
      if (!node) return;

      // Determine the best image URL to use, prioritizing larger images
      const displayUrl = node.image_versions2?.candidates[0]?.url || (node.carousel_media && node.carousel_media[0]?.image_versions2?.candidates[0]?.url);

      const filteredItem = {
        postId: node.pk,
        type: node.product_type, // 'clips', 'carousel_container', 'feed'
        postUrl: `https://www.instagram.com/p/${node.code}/`,
        caption: node.caption?.text || '',
        likes: node.like_count || 0,
        comments: node.comment_count || 0,
        viewCount: node.view_count || 0, // Specifically for videos/reels
        timestamp: node.taken_at,
        displayUrl: displayUrl,
        isVideo: node.media_type === 2, // 1 for Photo, 2 for Video, 8 for Carousel
        carouselMedia: node.carousel_media?.map(media => ({
          id: media.pk,
          url: media.image_versions2?.candidates[0]?.url,
          isVideo: media.media_type === 2,
        })) || [],
      };
      filteredItem.interactions = filteredItem.likes + filteredItem.comments;

      // Categorize into POSTS (images/carousels) and REELS (videos)
      if (filteredItem.isVideo) {
        reels.push(filteredItem);
      } else {
        posts.push(filteredItem);
      }
    });

    const result = {
      POSTS: posts,
      REELS: reels,
      pagination_token: newPaginationToken
    };
    
    console.log(`🎉 Returning result with ${posts.length} posts, ${reels.length} reels, and a pagination token.`);
    res.json(result);

  } catch (error) {
    console.error(`❌ Media endpoint error:`, error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  getMediaByUsername,
};