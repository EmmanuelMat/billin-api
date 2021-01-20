const express = require("express");
const router = express.Router();
const service = require("../services/reciept.service");

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
  const { id } = req.params;
  const model = await service.getById(id);
  printReciept(model)
  res.send(true);;
});

router.get("/last", async (req, res) => {
  const model = await service.getLastBill();
  res.json(model);
});

router.post("/", async (req, res) => {
  const result = await service.post(req);
  res.json(result);
});

module.exports = router;

/**{"totalPrice": 5000,
"subTotal": 4366,
'tax': 799,
"isCredit" false,
"clientId": "5ff53e2f6b2202fde5e92b50",
payDate: null
"details": [
  {
    "productId": "5ff3d9dfd93e2be06cd46676",
    "sellPrice": 35, 
    "quantity": 150
  }, 
  {
    "productId": "5ff3d7f5a7e1a2de62436208",
    "sellPrice": 25, 
    "quantity": 100
  }
]}**/
