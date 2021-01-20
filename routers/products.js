const express = require("express");
const router = express.Router();
const service = require("../services/product.service");

router.get("/", async (req, res) => {
  const { pagenumber, pagesize, name } = req.query;
  const model = await service.get(pagenumber, pagesize, name);
  res.json(model);
});
router.post("/", async (req, res) => {
  const result = await service.post(req);
  res.json(result);
});

module.exports = router;

//3242310
