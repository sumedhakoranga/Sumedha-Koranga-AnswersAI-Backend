const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const tokenPart = token.split(" ")[1];

  jwt.verify(tokenPart, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
