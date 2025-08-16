const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');

// Route to handle refresh token requests
router.get('/', handleRefreshToken);

module.exports = router;