const express = require("express");
const router = express.Router();
const service = require("../services/client.service");

router.get("/", async (req, res) => {
  const model = await service.get();
  res.json(model);
});

router.get("/by", async (req, res) => {
  const {  pagenumber, pagesize, name } = req.query;
  const model = await service.getByNameOrCode(pagenumber, pagesize, name);

  if (model === null) throw new Error("Cliente no existe");

  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req.body.data);
  res.json(result);
});

router.put("/", async (req, res) => {
  const result = await service.update(req.body.data);
  res.json(result);
});

module.exports = router;
