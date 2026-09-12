const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const auth = require('../middleware/auth');

// @route   GET api/alerts
// @desc    Get user alerts
// @access  Private
router.get('/', auth, alertController.getAlerts);

module.exports = router;
