const User = require('mongoose');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const foundUser = await User.findOne({username: user}).exec();
  
  if (!foundUser) {
    return res.sendStatus(401); // Unauthorized
  }
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // res.json({ success: `User ${user} is logged in!` });
    // jwt sign the user
    const roles = Object.values(foundUser.roles);
    // create access token with username and roles
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save the refresh token in the user's object
    const otherUsers = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.Save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true, // set to true if using https
      sameSite: "None", // set to 'None' for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ accessToken});
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
