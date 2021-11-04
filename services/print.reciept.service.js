const p = require("printer");
const conduce = require("../invoice-templates/conduce");
const copy = require("../invoice-templates/copy");
const reciept = require("../invoice-templates/reciept");



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

  printReciept(bill, copy, conduce) {
    if (conduce  == true) {
      this.print(reciept(bill), this.printConduce(bill));
      console.log("conduce", conduce)
      return;
    }

    if (copy == true) {
      this.print(reciept(bill), this.printCopy(bill));
      console.log("copy", copy)
      return
    }


    this.print(reciept(bill));

  }

  printConduce(bill) {
    print(conduce(bill));
  }

  printCopy(bill) {
    print(copy(bill));
  }

  print(template, cb = () => { }, cb2 = () => { }) {
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
}

module.exports = PrinterSingleton;
