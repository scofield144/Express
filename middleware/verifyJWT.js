const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }
  console.log(`Auth header: ${authHeader}`);
  const token = authHeader.split("")[1]; // Extract the token from the header
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = decoded.username; // Attach the username to the request object]
    next(); // Pass control to the next middleware function
  });
};

module.exports = verifyJWT;
