const context = require("../database/database.context");
 const unitSchema = new context.Schema({
     name: { type: String, required: true, unique: true }
 })