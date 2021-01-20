const context = require("../database/database.context");
const taxSchema = new context.Schema({
  porcentage: { type: Number, required: true },
  taxPorcentage: { type: Number, required: true },
  createDate: { type: Date, default: new Date() },
});

module.exports = context.model("Tax", taxSchema);
