const mongoose = require("mongoose");

const config = require("config");
const { CONNECTION_STRING } = require("../global/constanst/constant");
const connectionstring = config
  .get("database.connectionstring")
  .replace(CONNECTION_STRING.DATABASE, config.get("database.db"))
  .replace(CONNECTION_STRING.PASSWORD, config.get("database.pwd"));
mongoose
  .connect(connectionstring)
  .then(() => console.log("connected"))
  .catch((err) => console.log(" not +++++++++++++++ connected", err));
module.exports = mongoose;

