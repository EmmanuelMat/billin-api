 require("express-async-errors");
const express = require("express");
const app = express();
var cors = require("cors");
const home = require("./routers/home");
const providers = require("./routers/providers");
const products = require("./routers/products");
const clients = require("./routers/clients");
const taxReciept = require("./routers/tax.reciept");
const taxRecieptGov = require("./routers/tax.reciept.gov");
const reciept = require("./routers/reciept");
const tax = require("./routers/tax");
const user = require("./routers/user");
const auth = require("./routers/auth");
const errorHandlingMiddleware = require("./middleware/errorHandling");
const { ROUTES } = require("./global/constanst/constant");
const errorthrowMiddleware = require("./middleware/errorthrowMiddleware");

app.use(express.json());
//Third party middleware
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const authMiddleware = require("./middleware/authMiddleware");
// Routers middleware
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey IS NOT DEFINED");
  process.exit(1);
}
app.use(cors());
app.use(ROUTES.USER, user);
app.use(ROUTES.AUTH, auth);
app.use(authMiddleware);
app.use(ROUTES.HOME, home);
app.use(ROUTES.PROVIDERS, providers);
app.use(ROUTES.PRODUCTS, products);
app.use(ROUTES.CLIENS, clients);
app.use(ROUTES.TAX_RECIPT, taxReciept);
app.use(ROUTES.TAX_RECIPT_GOV, taxRecieptGov);
app.use(ROUTES.RACIEPT, reciept);
app.use(ROUTES.TAX, tax);
app.use(errorthrowMiddleware);
app.use(errorHandlingMiddleware);
app.listen(5000, () => {
  console.log("App listening on port 3000!");
});
