const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');

// POST request to /api/recommendations/generate
router.post('/generate', getRecommendations);

module.exports = router;