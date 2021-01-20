const express = require("express");
const router = express.Router();
const _ = require("lodash");
const service = require("../services/user.service");

router.get("/", async (req, res) => {
  const model = await service.get();
  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req);
  res
    .header("x-auth-token", result.token)
    .json(_.pick(result.payload, ["email", "name", "employeeNumber", "_id"]));
});

module.exports = router;
