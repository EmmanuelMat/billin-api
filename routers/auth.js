const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/authMiddleware");
const service = require("../services/auth.service");
const userService = require("../services/user.service");

router.get("/me", authMiddleware, async (req, res) => {
  const result = await userService.getUserByID(req.user._id);
  res.json(_.pick(result, ["email", "name", "employeeNumber", "_id"]));
});

router.post("/", async (req, res) => {
  const result = await service.auth(req);
  res.json({ token: result });
});

module.exports = router;
