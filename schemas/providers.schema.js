const mongoose = require("../database/database.context");
const providerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 250 },
  taxId: Number,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Provider', providerSchema)