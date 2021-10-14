const express = require("express");
const router = express.Router();
const service = require("../services/reciept.service");
const PrinterSingleton = require("../services/print.reciept.service");
const printer = new PrinterSingleton();
router.get("/", async (req, res) => {
  const { pagenumber, pagesize, name } = req.query;
  const model = await service.get(pagenumber, pagesize, name);
  res.json(model);
});

router.get("/byid/:id", async (req, res) => {
  const { id } = req.params;
  const model = await service.getById(id);
  res.json(model);
});

router.get("/print", async (req, res) => {
  const { id } = req.query;
  const model = await service.getById(id);

  printer.printReciept(model);
  res.send(true);
});

router.get("/last", async (req, res) => {
  const model = await service.getLastBill();
  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req.body);
  res.json(result);
});

router.put("/", async (req, res) => {
  const result = await service.update(req.body);
  res.json(result);
});

router.get("/client", async (req, res) => {
  const { clientid } = req.query;
  const result = await service.getByClientName(clientid);
  res.json(result);
});

router.get("/code", async (req, res) => {
  const { billNumber } = req.query;
  const result = await service.getByBillNumber(billNumber);
  res.json(result);
});


module.exports = router;
