const date = require('date-and-time');


function _detailsHelper(data) {
    return data
      .map(
        (item) => `${item.code}          ${
          item.quantity
        }    
        ${item.product.name.toLowerCase()}
      `
      )
      .join("") 
      .replace(/^\s+/gm, "");
  }

module.exports =  (bill) => `
      FERRETERIA GUERRERO KADEYHE SRL
   C/Duarte #49, Haina S.C, Frente Altice
            Tel: (809) 957-5060
              RNC: 131-93956-2

Conduce

Fecha: ${date.format(bill.createDate, 'DD/MM/YYYY HH:mm:ss')}
Numero de conduce: ${bill.billNumer}
 
cod  Prodt   cant   Ud price    Total
-----------------------------------------
${_detailsHelper(bill.details)}
-----------------------------------------
vendedor:             
Deybi G.          
    
Nombre : ${bill.client.name}
RNC:  ${bill.client.taxId}
Telefono : ${bill.client.pNumber}
Celular : ${bill.client.cNumber}
Direccion : ${bill.client.address}


Note: ${bill.notes}
\n\n





`;