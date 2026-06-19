const express = require('express');
const router = express.Router();
const { getRecommendations, getRecommendationPitch} = require('../controllers/recommendationController');

// POST request to /api/recommendations/generate
router.post('/generate', getRecommendations);

//POST request to /api/recommendations/pitch  (for gemini api)
router.post('/pitch', getRecommendationPitch);

module.exports = router;