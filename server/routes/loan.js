const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../middleware/auth');

router.post('/apply', auth, loanController.apply);
router.put('/update', auth, loanController.update);
router.get('/status', auth, loanController.getStatus);
router.get('/', auth, loanController.getLoans);

module.exports = router;
