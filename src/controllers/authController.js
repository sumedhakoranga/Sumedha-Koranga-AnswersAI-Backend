const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email); 
  try {
    const user = await User.findOne({ where: { email } });
    console.log("User found:", user); 

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log("Password is valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET is not defined");
      return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token);

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: newToken });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};
