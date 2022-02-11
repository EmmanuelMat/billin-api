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
  const data = await Model.find()
    .sort({ createDate: "desc" })
    .populate(PUPULATE_RECIEPT)
    .skip(parseInt(pageNumber) * parseInt(pageSize))
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
    "amountPaid",
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
const x = await Model.findOne({ _id }).populate(PUPULATE_RECIEPT);
console.log(x)
return x
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
  return { test: "test" };
}

async function getByClientName(client_id) {
  const data = await Model.find({ client: client_id }).populate(
    PUPULATE_RECIEPT
  );
  const count = await Model.countDocuments();
  return { data, count: { pageNumber: 1, pageSize: data.length, count } };

}

async function getByBillNumber (billNumer) {
  const data = await Model.findOne({ billNumer }).populate(
    PUPULATE_RECIEPT
  );
  const count = await Model.countDocuments();
  return { data: [data], count: { pageNumber: 1, pageSize: 1, count } };

}

module.exports = { update, get, post, getLastBill, getById, getByClientName, getByBillNumber };
