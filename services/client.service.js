const Model = require("../schemas/client.schema");
const _ = require("lodash");
const { validate } = require("../global/helpers");
const { CLIENT_VALIDATOR } = require("../validators/validators");

async function get() {
  return await Model.find();
}

async function getByNameOrCode(pagenumber = 1, pagesize = 10, name = "") {
 
  const regExp = new RegExp(`.*${name}.*`, "i");
  const data = await Model.find({ name: regExp })
    .skip(parseInt(pagenumber) * parseInt(pagesize))
    .limit(parseInt(pagesize));

  const count = await Model.countDocuments();
  return { data, count: { pagenumber, pagesize: data.length, count } };
}

async function post(data) {
  const code = Math.floor(1000 + Math.random() * 9000);
  let model = _.pick(data, ["name", "taxId", "pNumber", "cNumber", "address"]);
  model.code = code;
  validate(model, CLIENT_VALIDATOR);
  return await new Model(model).save();
}

async function exits(_id) {
  return await Model.exists({ _id });
}

async function update(data) {
  return await Model.findByIdAndUpdate(data._id, {
    $set: {
      name: data.name,
      taxId: data.taxId,
      cNumber: data.pNumber,
      pNumber: data.pNumber,
      address: data.address,
    },
  });
}

async function update(data) {
  return await Model.findOneAndUpdate({ _id: data._id }, { ...data });
}
module.exports = { update, get, post, exits, getByNameOrCode, update };
