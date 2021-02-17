module.exports = (bill) => `
      FERRETERIA GUERRERO KADEYHßE SRL
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


Note: ${bill.notes}
\n\n





`;