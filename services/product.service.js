const Model = require("../schemas/product.schema");
const _ = require("lodash");

async function get(pageNumber = 1, pageSize = 10, name = "", code = 0) {
  const regExpName = new RegExp(`.*${name}.*`, "i");
  const regExpCode = new RegExp(`.*${code}.*`, "i");
  const model = await Model.find({name: regExpName })
    .populate("provider", "name")
    .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize));
  const count = await Model.countDocuments();

  return { model, count: { pageNumber, pageSize, count } };
}

async function post(req) {
  const model = _.pick(req.body, [
    "name",
    "description",
    "cost",
    "provider",
    "quantity",
    "unit",
    "code",
  ]);
  return await new Model(model).save();
}

module.exports = { get, post };
