const Model = require("../schemas/user.schema");
const { validate } = require("../global/helpers");
const validators = require("../validators/validators");
const bcrypt = require("bcrypt");
const { ERROR_MESSAGES } = require("../global/constanst/constant");

async function get() {
  return await Model.find();
}

async function auth(req) {
  validate(req.body, validators.AUTH_VALIDATOR);
  let user = await Model.findOne({ email: req.body.email });
  if (!user) throw new Error(ERROR_MESSAGES.INVALID_USER_PASSWORD);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) throw new Error(ERROR_MESSAGES.INVALID_USER_PASSWORD);
  return user.generateToken();
}

module.exports = { get, auth };
