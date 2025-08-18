const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Username already exists." });
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    

    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    
    console.log(result);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
