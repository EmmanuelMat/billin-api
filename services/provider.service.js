const Model = require("../schemas/providers.schema");
const _ = require("lodash");

async function get() {
    return await Model.find();
  }

async function post(req) {
    const provider = new Model(_.pick(req.body, ["name", "taxId", "isActive"]));
    return await provider.save()
}
module.exports = { get, post };
