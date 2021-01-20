const context = require("../database/database.context");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new context.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  employeeNumber: { type: String, required: true },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};
module.exports = context.model("User", userSchema);
