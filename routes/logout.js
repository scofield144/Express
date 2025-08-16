const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');

// Route to handle refresh token requests
router.get('/', handleRefreshToken);

module.exports = router;
// This route will handle requests to refresh the JWT token using the refresh token stored in cookies.
// It will verify the refresh token and issue a new access token if valid.
// The route is protected by the verifyJWT middleware to ensure that only authenticated users can access it