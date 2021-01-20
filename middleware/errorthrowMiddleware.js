const { ERROR_MESSAGES } = require("../global/constanst/constant");

module.exports = (req, res, next) => {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    next(error);
  }