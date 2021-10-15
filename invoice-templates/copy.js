const genTaxtReciept = (gov, sequence) => `${gov.serie}${gov.type}${sequence}`;

function pad(n, width, z) {
  z = z || " ";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



function _detailsHelper(data) {
  return data
    .map(
      (item) => `${item.code}          ${item.quantity
        }    ${item.sellPrice.toFixed(2)}      ${pad(
          (item.sellPrice * item.quantity).toFixed(2).toString(),
          8,
          " "
        )} 
    ${item.product.name.toLowerCase()}
  `
    )
    .join("")
    .replace(/^\s+/gm, "");
}


module.exports = (bill) => `  
      FERRETERIA GUERRERO KADEYHE SRL
   C/Duarte #49, Haina S.C, Frente Altice
            Tel: (809) 957-5060
              RNC: 131-93956-2
  copia.

${bill.taxReciept.taxReciept.type == "00" ? "Conduce" : "Factura"}

Fecha: 01/13/2021 2:57:01 PM
${bill.taxReciept.taxReciept.type == "00"
    ? ""
    : `NCF : ${genTaxtReciept(
      bill.taxReciept.taxReciept,
      bill.taxReciept.sequence
    ).toUpperCase()}
Vencimiento de secuencia 31/12/21`
  }
${bill.taxReciept.taxReciept.type == "00"
    ? "Numero de conduce"
    : "Numero de factura"
  }: ${bill.billNumer}
${bill.taxReciept.taxReciept.type == "00" ? "" : `Valida para: ${bill.taxReciept.taxReciept.name}`}

 
cod  Prodt   cant   Ud price    Total
-----------------------------------------
${_detailsHelper(bill.details)}
-----------------------------------------
vendedor:             
Deybi G.              Subtotal: $${bill.subTotal.toFixed(2)}
                      ITBIS:    $${bill.tax.toFixed(2)} 
                      Total:     $${bill.totalPrice.toFixed(2)}
    
Nombre : ${bill.client.name}
Telefono : ${bill.client.pNumber}
Celular : ${bill.client.cNumber}
Direccion : ${bill.client.address}


Note: ${bill.notes}
\n\n





`;