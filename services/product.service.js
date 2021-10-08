const Model = require("../schemas/product.schema");
const _ = require("lodash");

async function get(pageNumber = 0, pageSize = 10, name = "", code = 0) {
  const data = await Model.find({
    name: { $regex: ".*" + name + ".*", $options: "i" },
  })
    .populate("provider", "name")
    .skip((parseInt(pageNumber)) * parseInt(pageSize))
    .limit(parseInt(pageSize));
  const count = await Model.countDocuments();

  return { data, count: { pageNumber, pageSize, count } };
}

async function post(data) {
  const lastRecord = await Model.findOne(
    {},
    {},
    { sort: { createDate: "-1" } }
  );
  data.code = lastRecord.code + 1;
  const model = _.pick(data, [
    "name",
    "description",
    "cost",
    "price",
    "provider",
    "quantity",
    "unit",
    "taxed",
    "code",
  ]);
  return await new Model(model).save();
}

async function update(data) {
  const model = _.pick(data, [
    "name",
    "description",
    "cost",
    "price",
    "provider",
    "quantity",
    "unit",
    "taxed",
    "code",
  ]);
  return await  Model.findOneAndUpdate({_id: data._id}, {...model});
}

module.exports = { get, post, update };
