const p = require("printer");
const conduce = require("../invoice-templates/conduce");
const copy = require("../invoice-templates/copy");
const reciept = require("../invoice-templates/reciept");
const EventEmitter = require("events")


class PrinterSingleton extends EventEmitter {
  constructor() {
    super()
    if (PrinterSingleton.instance instanceof PrinterSingleton) {
      return PrinterSingleton.instance;
    }
    this.printer = p;
    PrinterSingleton.instance = this;
    Object.freeze(this.printer);
    Object.freeze(this);
  }

  printReciept(bill, copy, conduce) {
      this.print(reciept(bill));
   
      this.on("print", console.log)

  }

  printConduce(bill) {
    print(conduce(bill));
  }

  printCopy(bill) {
    print(copy(bill));
  }

  print(template, conduce, copy) {
    p.printDirect({
      data: template,
      type: "RAW",
      success: function (jobID) {
       this.emit("print", {jobID, conduce, copy })
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
}

module.exports = PrinterSingleton;
