const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

// @route   GET api/recommendations
// @desc    Get user recommendations
// @access  Private
router.get('/', auth, recommendationController.getRecommendations);

module.exports = router;
