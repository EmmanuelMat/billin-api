const Model = require("../schemas/tax.reciept.schema").Model;
const _ = require("lodash");
const { validate } = require("../global/helpers");
const validators = require("../validators/validators");

async function get() {
  return await Model.find();
}

async function getLast(taxReciept) {
  return await Model.findOne(
    { taxReciept },
    {},
    { sort: { sequence: "-1" } }
  ).populate({
    path: "taxReciept",
    model: "TaxRecieptGovSchema",
  });
}

async function post(data) {
  console.log(data);

  const model = _.pick(data, ["taxReciept", "type", "sequence", "isUsed"]);
  validate(data, validators.TAX_RECIPT_VALIDATOR);
  return await new Model(model).save();
}

async function exits(_id) {
  return await Model.exists(_id);
}

module.exports = { get, post, exits, getLast };
