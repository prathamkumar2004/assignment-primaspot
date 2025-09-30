const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller.js');

// Define the POST route for fetching user media
router.post('/media', mediaController.getMediaByUsername);

module.exports = router;