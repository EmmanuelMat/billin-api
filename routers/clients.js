const express = require("express");
const router = express.Router();
const service = require("../services/client.service");

router.get("/", async (data, res) => {
  const model = await service.get();
  res.json(model);
});

router.get("/by", async (data, res) => {
  const { name, id } = req.query;
  const model = await service.getByNameOrCode(name, id);

  if (model === null) throw new Error("Cliente no existe");

  res.json(model);
});

router.post("/", async (data, res) => {
  const result = await service.post(req);
  res.json(result);
});

module.exports = router;
