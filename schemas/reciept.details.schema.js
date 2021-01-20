const context = require("../database/database.context");
const Double = require("@mongoosejs/double");

const recieptDetailsSchema = new context.Schema({
  product: {
    type: context.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  sellPrice: { type: Double, required: true },
  quantity: { type: Number, required: true },
  code: { type: Number, required: true },
});


module.exports = {
  Model: context.model('RecieptDetails', recieptDetailsSchema),
  schema: recieptDetailsSchema,
};