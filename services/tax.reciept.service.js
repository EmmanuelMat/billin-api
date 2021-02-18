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
  const model = _.pick(data, ["taxReciept", "type", "sequence", "isUsed"]);
  validate(data, validators.TAX_RECIPT_VALIDATOR);
  return await new Model(model).save();
}

async function exits(_id) {
  return await Model.exists(_id);
}

const genTaxtReciept = (gov, sequence) => `${gov.serie}${gov.type}${sequence}`;
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
async function generate(gov_id = "5ffb47828f1bc6e77a8791ba") {
  let lastRecord = await Model.findOne(
    { taxReciept: gov_id },
    {},
    { sort: { sequence: "-1" } }
  ).populate({
    path: "taxReciept",
    model: "TaxRecieptGovSchema",
  });
  lastRecord.sequence = parseInt(lastRecord.sequence) + 1;
  lastRecord.sequence = pad(lastRecord.sequence, 7);
  lastRecord.taxRecieptId = genTaxtReciept(
    lastRecord.taxReciept,
    lastRecord.sequence
  );
  return {
    lastRecord: _.pick(lastRecord, [
      "createDate",
      "taxReciept",
      "sequence",
      "isUsed",
    ]),
    sequense: lastRecord.taxRecieptId,
  };
}

async function update(data) {
  return await Model.findOneAndUpdate({ _id: data._id }, { ...data });
}
module.exports = { generate, update, get, post, exits, getLast };
