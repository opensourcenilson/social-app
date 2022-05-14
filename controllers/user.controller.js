const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("../middleware/jwt_verify");

exports.register = async (req, res) => {
  JSON.stringify(req.body);
  const { username, password } = req.body;
   if (!username) {
    res
      .status(400)
      .json({ success: false, error: "Please fill your username" });
  } else if (!password) {
    res
      .status(400)
      .json({ success: false, error: "Please fill your password" });
  }
  else {
    try {
      const user = new User({
        username,
        password,
      });
      await user.save();
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please fill in all fields" });
  } else {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(400).json({ success: false, error: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ success: false, error: "Incorrect password" });
      } else {
        const userToken = user.getSignedJwtToken();
        res.status(200).json({ success: true, token: userToken });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
};
