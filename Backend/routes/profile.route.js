const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller.js');

// Define the POST route for fetching a user profile by username
router.post('/profile', profileController.getProfileByUsername);

module.exports = router;