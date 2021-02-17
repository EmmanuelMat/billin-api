const Model = require("../schemas/reciept.schema");
const taxRservice = require("./tax.reciept.service");
const clientService = require("./client.service");
const _ = require("lodash");
const { _getLast, validate } = require("../global/helpers");
const { RECIEPT_VALIDATION } = require("../validators/validators");

const PUPULATE_RECIEPT = [
  {
    path: "details",
    populate: {
      path: "product",
      model: "Product",
    },
  },
  {
    path: "client",
    model: "Client",
  },
  {
    path: "taxReciept",
    model: "TaxRecipt",
    populate: {
      path: "taxReciept",
      model: "TaxRecieptGovSchema",
    },
  },
];

async function get(pageNumber = 1, pageSize = 10, code) {
  // const regExp = new RegExp(`.*${code}.*`, "i")
  const data = await Model.find({ $or: [{ billNumer: code }, {}] })
    .populate(PUPULATE_RECIEPT)
    .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize));
  const count = await Model.countDocuments();
  return { data, count: { pageNumber, pageSize: data.length, count } };
}

async function post(data) {
  let client = await saveUpdateClient(data.client);
  const billNumber = Math.floor(1000 + Math.random() * 9000);
  const taxReciept = await taxRservice.post(data.taxReciept);
  const model = _.pick(data, [
    "totalPrice",
    "subTotal",
    "tax",
    "isCredit",
    "payDate",
    "client",
    "details",
    "discount",
    "notes",
  ]);
  model.client = client;
  model.taxReciept = taxReciept._id;
  model.billNumer = billNumber;
  validate(model, RECIEPT_VALIDATION);
  return await new Model(model).save();
}

async function getLastBill() {
  return _getLast(Model);
}

async function getById(_id) {
  return Model.findOne({ _id }).populate(PUPULATE_RECIEPT);
}

async function saveUpdateClient(client) {
  const isClient = await clientService.exits(client._id);
  if (!isClient) {
    client = await clientService.post(client);
    client = client._id;
  } else {
    client = await clientService.update(client);
    client = client._id;
  }
  return client._id;
}

async function update(data) {
  console.log(test, "test");
  return {test, test2}
}


module.exports = { update, get, post, getLastBill, getById };
