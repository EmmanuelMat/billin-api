const p = require("printer");
const conduce = require("../invoice-templates/conduce");
const reciept = require("../invoice-templates/reciept");
function printReciept(bill) {
  print(reciept(bill));
}


function printConduce(bill) {
  print(conduce(bill));
}

function print(template) {
  p.printDirect({
    data: template,
    type: "RAW",
    options: {format: "RAW [FF auto]"},
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
