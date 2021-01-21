const { isValidObjectId } = require("mongoose");
const Model = require("../schemas/tax.schema");
const _ = require("lodash");

async function get() {
  return await Model.find();
}

async function post(data) {
  const model = _.pick(data, ["porcentage", "taxPorcentage"]);
  return await new Model(model).save();
}

async function remove(_id) {
  return await Model.deleteOne(filter={_id});
}

module.exports = { get, post, remove};
