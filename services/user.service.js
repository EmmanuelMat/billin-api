const Model = require("../schemas/user.schema");
const { validate } = require("../global/helpers");
const validators = require("../validators/validators");
const bcrypt = require("bcrypt");
const _ = require("lodash");

async function get() {
  return await Model.find();
}

async function getUserByID(_id) {
  return await Model.findOne({ _id });
}

async function post(data) {
  validate(data, validators.USER_VALIDATOR);
  const schema = new Model(
    _.pick(data, ["email", "password", "name", "employeeNumber"])
  );
  let salt = await bcrypt.genSalt(10);
  schema.password = await bcrypt.hash(schema.password, salt);
  const token = await schema.generateToken();
  const payload = await schema.save();
  return _.create({
    token,
    payload,
  });
}

module.exports = { get, post, getUserByID };
