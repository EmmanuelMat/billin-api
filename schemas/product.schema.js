const context = require("../database/database.context");
const Double = require("@mongoosejs/double");
const productSchema = new context.Schema({
  name: { required: true, maxlength: 250, type: String },
  description: { maxlength: 250, type: String },
  code: { maxlength: 10, type: Number, required: true },
  cost: { type: Double },
  quantity: { type: Number },
  barcode: { type: Number },
  unit: { type: String },
  department: { type: String },
  provider: { type: context.Schema.Types.ObjectId, ref: "Provider" },
  createDate: {type: Date, default: new Date() },
  lastModifyDate: {type: Date, default: new Date() },
  taxed: { type: Boolean, required: true },
  user: {type: context.Schema.Types.ObjectId, ref: "Provider"}
});

module.exports = context.model("Product", productSchema);
