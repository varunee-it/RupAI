const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// @route   GET api/transactions
// @desc    Get user transactions
// @access  Private
router.get('/', auth, transactionController.getTransactions);

module.exports = router;
