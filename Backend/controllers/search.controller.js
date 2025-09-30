const { makeApiPostRequest } = require('../utils/api');

const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST ;

const searchByUsername = async (req, res) => {
  try {
    console.log(`🔍 Search endpoint called with body:`, req.body);
    
    const { username } = req.body;
    
    if (!username) {
      console.log('❌ Error: Username is missing in the body');
      return res.status(400).json({ error: 'Username is required in the body' });
    }

    console.log(`🔍 Search query: username=${username}`);

    const url = `https://${RAPIDAPI_HOST}/search_ig.php`;
    const data = {
      search_query: username
    };

    const responseData = await makeApiPostRequest(url, data, RAPIDAPI_HOST);
    console.log(`📋 API response:`, responseData);
    
    const users = responseData.users || [];
    console.log(`📊 Users array length: ${users.length}`);

    // Extract only required fields
    const requiredData = users.map((item, index) => {
      const filteredItem = {
        id: item.user.pk,
        name: item.user.full_name,
        image: item.user.profile_pic_url,
        screenName: item.user.username
      };
      console.log(`✅ Processed item ${index + 1}:`, filteredItem);
      return filteredItem;
    });

    console.log(`🎉 Returning ${requiredData.length} results`);
    res.json(requiredData);

  } catch (error) {
    console.error(`❌ Search endpoint error:`, error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  searchByUsername,
};