const Joi = require("joi");

const USER_VALIDATOR = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
  password: Joi.string().min(5).max(250).required(),
  employeeNumber: Joi.string().required().max(30),
});

const AUTH_VALIDATOR = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
  password: Joi.string().min(5).max(250).required(),
});

const CLIENT_VALIDATOR = Joi.object({
  name: Joi.string().min(5).max(250).required(),
  taxId: Joi.number(),
  cNumber: Joi.string(),
  pNumber: Joi.string(),
  address: Joi.string(),
  code: Joi.required(),
});

const TAX_RECIPT_VALIDATOR = Joi.object({
  sequence: Joi.string().min(7).max(7).required(),
  isUsed: Joi.boolean().required(),
  taxReciept: Joi.required(),
});

const RECIEPT_VALIDATION = Joi.object({
  taxReciept: Joi.required(),
  totalPrice: Joi.required(),
  subTotal: Joi.required(),
  tax: Joi.required(),
  isCredit: Joi.boolean().required(),
  payDate: Joi.date().required(),
  client: Joi.required(),
  details: Joi.array().items({
    product: Joi.required(),
    sellPrice: Joi.required(),
    quantity: Joi.required(),
    code: Joi.required(),
  }),
  billNumer: Joi.required(),
  discount: Joi.required(),
  notes: Joi.string()
});
module.exports = {
  USER_VALIDATOR,
  AUTH_VALIDATOR,
  TAX_RECIPT_VALIDATOR,
  CLIENT_VALIDATOR,
  
  RECIEPT_VALIDATION,
};
