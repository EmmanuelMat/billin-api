const Joi = require("joi");
const context = require('../database/database.context');
function validate(data, schema) {
  return Joi.assert(data, schema);
}

async function _getLast(Model) {
  return await Model.findOne({}, {}, { sort: { createDate: "-1" } });
}

module.exports = { validate, _getLast };
