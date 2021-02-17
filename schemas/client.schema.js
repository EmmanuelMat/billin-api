const context = require("../database/database.context");
const clientSchema = new context.Schema({
  name: { type: String, required: true, maxlength: 250 },
  taxId: { type: Number  },
  cNumber: { type: Number },
  pNumber: { type: Number },
  address: { type: String },
  code: { type: Number, required: true },
});

module.exports = context.model("Client", clientSchema);
