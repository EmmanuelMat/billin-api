const Model = require("../schemas/providers.schema");
const _ = require("lodash");

async function get() {
    return await Model.find();
  }

async function post(data) {
    const provider = new Model(_.pick(data, ["name", "taxId", "isActive"]));
    return await provider.save()
}
module.exports = { get, post };
