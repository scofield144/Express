const User = require('mongoose')

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401); // Unauthorized
  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken}).exec();

  if (!foundUser) {
    return res.sendStatus(403);
  } // Forbidden}
  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403); // Forbidden
      }
       const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" } // Set the access token expiration time
      );
      res.json({ accessToken });
    } // Send the new access token to the client
  );
};

module.exports = { handleRefreshToken };