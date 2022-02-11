const p = require("printer");
const conduce = require("../invoice-templates/conduce");
const copy = require("../invoice-templates/copy");
const reciept = require("../invoice-templates/reciept");
const EventEmitter = require("events");

class PrintEmitter extends EventEmitter {
  constructor() {
    super()
  }

}

const printEmitter = new PrintEmitter();
printEmitter.on("print", ({ bill, copy, conduce }) => {
  const printer = new PrinterSingleton()
  if (conduce)
    setTimeout(() => {
      printer.printCopy(bill)
    }, 3000);

  if (copy)
    setTimeout(() => {
      printer.printConduce(bill)
    }, 5000);
})


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

  printReciept = (bill, copy = 'false', conduce = "false") => {
    this.print(reciept(bill), JSON.parse(copy), JSON.parse(conduce), bill);


  }

  printConduce(bill) {
    this.print(conduce(bill));
  }

  printCopy(bill) {
    this.print(copy(bill));
  }

  print(template, conduce, copy, bill) {
    p.printDirect({
      data: template,
      type: "RAW",
      success: (jobID) => {
        printEmitter.emit("print", { bill, conduce, copy })

      },
      error: function (err) {
        console.log(err);
      },
    });

  }
}

module.exports = PrinterSingleton;
