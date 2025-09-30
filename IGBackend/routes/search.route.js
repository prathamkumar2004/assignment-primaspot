const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller.js');

// Define the POST route for searching by username
router.post('/search', searchController.searchByUsername);

module.exports = router;