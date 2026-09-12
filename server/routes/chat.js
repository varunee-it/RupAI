const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// @route   POST api/chat
// @desc    Chat with AI assistant
// @access  Private
router.post('/', auth, chatController.chat);

module.exports = router;
