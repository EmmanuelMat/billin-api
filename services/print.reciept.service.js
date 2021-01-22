const p = require("printer");

const genTaxtReciept = (gov, sequence) => `${gov.serie}${gov.type}${sequence}`;
function pad(n, width, z) {
  z = z || " ";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function name(data) {
  return data
    .map(
      (item) => `${item.code}          ${
        item.quantity
      }    ${item.sellPrice.toFixed(2)}      ${pad(
        (item.sellPrice * item.quantity).toFixed(2).toString(),
        7,
        " "
      )} 
      ${item.product.name.toLowerCase()}
    `
    )
    .join("")
    .replace(/^\s+/gm, "");
}
var btn = (bill) => `
      FERRETERIA GUERRERO KADEYHE SRL
   C/Duarte #49, Haina S.C, Frente Altice
            Tel: (809) 957-5060
              RNC: 131-93956-2

${bill.taxReciept.taxReciept.type == "00" ? "Conduce" : "Factura"}

Fecha: 01/13/2021 2:57:01 PM
${
  bill.taxReciept.taxReciept.type == "00"
    ? ""
    : `NCF : ${genTaxtReciept(
        bill.taxReciept.taxReciept,
        bill.taxReciept.sequence
      ).toUpperCase()}
Vencimiento de secuencia 31/12/21`
}
${
  bill.taxReciept.taxReciept.type == "00"
    ? "Numero de conduce"
    : "Numero de factura"
}: ${bill.billNumer}
${bill.taxReciept.taxReciept.type == "00" ? "" : `Valida para: ${bill.taxReciept.taxReciept.name}`}

 
cod  Prodt   cant   Ud price    Total
-----------------------------------------
${name(bill.details)}
-----------------------------------------
vendedor:             
Deybi G.              Subtotal: $${bill.subTotal.toFixed(2)}
                      ITBIS:    $${bill.tax.toFixed(2)} 
                      Total:     $${bill.totalPrice.toFixed(2)}
    
Nombre : ${bill.client.name}
Telefono : ${bill.client.pNumber}
Celular : ${bill.client.cNumber}
Direccion : ${bill.client.address}
\n\n





`;

function printReciept(bill) {
  console.log(bill, "bill");
  const template = btn(bill);
  p.printDirect({
    data: template,
    type: "RAW",
    success: function (jobID) {
      console.log("sent to printer with ID: " + jobID);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

module.exports = {
  printReciept,
};
