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
    success: function (jobID) {
      console.log("sent to printer with ID: " + jobID);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

class PrinterSingleton {
  constructor() {
    if (PrinterSingleton.instance instanceof PrinterSingleton) {
      return PrinterSingleton.instance;
    }
    this.printer = p;
    PrinterSingleton.instance = this;
    Object.freeze(this.printer);
    Object.freeze(this);
  }

  printReciept(bill) {
    print(reciept(bill));
  }

  printConduce(bill) {
    print(conduce(bill));
  }
  print(template) {
    this.printer.printDirect({
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
}

module.exports = PrinterSingleton;
