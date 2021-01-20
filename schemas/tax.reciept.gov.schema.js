const context = require("../database/database.context");

const taxRecieptGovSchema = new context.Schema({
  serie: { type: String, maxlength: 1, required: true },
  type: { type: String, required: true, max: 99 },
  name: { type: String, required: true }
});

module.exports = {
  Model: context.model("TaxRecieptGovSchema", taxRecieptGovSchema),
  schema: taxRecieptGovSchema,
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