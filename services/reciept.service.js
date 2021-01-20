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
      select: ["name", "description", "code"],
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

async function get() {
  return await Model.find().populate(PUPULATE_RECIEPT);
}

async function post(req) {
  let client = req.body.client._id;
  const isClient = await clientService.exits(client);
  const billNumber = Math.floor(1000 + Math.random() * 9000);
  if (!isClient) {
    client = await clientService.post(req.body.client);
  }
 clientService.update(req.body.client);
  const taxReciept = await taxRservice.post(req.body.taxReciept);
  const model = _.pick(req.body, [
    "totalPrice",
    "subTotal",
    "tax",
    "isCredit",
    "payDate",
    "client",
    "details",
    "discount",
    "notes"
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

module.exports = { get, post, getLastBill, getById };
