const config = require("config");
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) throw new Error("Access denied. No token provided.");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  req.user = decoded;
  next();
};
