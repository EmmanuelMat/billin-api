const express = require("express");
const router = express.Router();
const Service = require("../services/provider.service");

router.get("/", async(data, res) => {
  const provider =  await Service.get();
  res.json(provider);
});

router.post("/", async (data, res) => {
  const result = await Service.post(data);
  res.json(result);
});
module.exports = router;
