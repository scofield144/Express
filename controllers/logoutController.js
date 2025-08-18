const User = require('mongoose');



const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;
  
  const foundUser = User.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    return res.sendStatus(204); // No content
  }
    // Remove the refresh token from the user's object
  
  foundUser.refreshToken = '';
  const result = await found.Save();
  console.log(result);
  

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" }); // Clear the cookie
  res.sendStatus(204); // No content

};
module.exports = { handleLogout };
