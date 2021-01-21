
const Model = require("../schemas/tax.reciept.gov.schema").Model;
const _ = require("lodash");

async function get() {
  return await Model.find();
}

async function post(data) {
  const model = _.pick(data, ["serie", "type", "name"]);
  return await new Model(model).save();
}

module.exports = { get, post };
