const express = require("express");
const router = express.Router();
const service = require("../services/tax.reciept.service");

router.get("/", async (req, res) => {
  const model = await service.get();
  res.json(model);
});

router.get("/last", async (req, res) => {
  const { taxreciept } = req.query;
  const model = await service.getLast(taxreciept);
  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req.body);
  res.json(result);
});

router.post("/edit", async (req, res) => {
  const model = await service.update(req.body);
  res.json(model);
});

router.delete("/", async (req, res) => {
  const { _id } = req.query;
  const model = await service.remove(_id);
  res.json(model);
});

module.exports = router;
