const express = require("express");
const router = express.Router();
const Service = require("../services/provider.service");

router.get("/", async(req, res) => {
  const provider =  await Service.get();
  res.json(provider);
});

router.post("/", async (req, res) => {
  const result = await Service.post(req.body);
  res.json(result);
});
module.exports = router;
