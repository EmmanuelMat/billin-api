const context = require("../database/database.context");
const taxRecieptSchema = new context.Schema({
  taxReciept: {type: context.Schema.Types, required: true},
  sequence: { type: String, required: true, maxlength: 8 },
  isUsed: { type: Boolean, required: true },
  createDate: { type: Date, default: new Date()}
});

module.exports = {
  Model: context.model("TaxRecipt", taxRecieptSchema),
  schema: taxRecieptSchema,
};




/** Gubernamental b15 +6000
 * Nota credito  b04 +5000
 * Registor de gastos menores b13 +5
 * facturas de  consumo b02 +20000
 * Regimen especial de tributacion b14 +5 no impuesto
 * Facturas para creditos fiscal b01 - 181
 * Factura sin comprobante 
 * 
*/