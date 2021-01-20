const context = require("../database/database.context");
const Double = require("@mongoosejs/double");
const recieptDetails = require("./reciept.details.schema");
const recieptSchema = new context.Schema({
  taxReciept: { type: context.Schema.Types.ObjectId, ref: "TaxRecipt" },
  totalPrice: { type: Double, required: true },
  subTotal: { type: Double, required: true },
  tax: { type: Double, required: true },
  isCredit: { type: Boolean, required: true },
  createDate: { type: Date, default: new Date() },
  payDate: { type: Date, default: new Date() },
  client: { type: context.Schema.Types.ObjectId, ref: "Clent" },
  details: { type: [recieptDetails.schema], required: true },
  billNumer: { type: Number, required: true },
  discount: { type: Number, required: true },
  notes: { type: String }
});

module.exports = context.model("Reciept", recieptSchema);
