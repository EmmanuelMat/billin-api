const express = require("express");
const router = express.Router();
const service = require("../services/product.service");

router.get("/", async (data, res) => {
  const { pagenumber, pagesize, name } = data.query;
  const model = await service.get(pagenumber, pagesize, name);
  res.json(model);
});
router.post("/", async (data, res) => {
  const result = await service.post(data);
  res.json(result);
});

module.exports = router;

//3242310
