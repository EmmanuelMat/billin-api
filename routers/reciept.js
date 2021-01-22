const express = require("express");
const router = express.Router();
const service = require("../services/reciept.service");
const printService = require("../services/print.reciept.service");

router.get("/", async (req, res) => {
  const model = await service.get();
  res.json(model);
});

router.get("/byid/:id", async (req, res) => {
  const { id } = req.params;
  const model = await service.getById(id);
  res.json(model);
});

router.get("/print", async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const model = await service.getById(id);
  printService.printReciept(model)
  res.send(true);;
});

router.get("/last", async (req, res) => {
  const model = await service.getLastBill();
  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req.body);
  res.json(result);
});

module.exports = router;


