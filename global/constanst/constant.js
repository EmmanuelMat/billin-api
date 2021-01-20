const ROUTES = {
     PROVIDERS: "/providers",
     PRODUCTS: "/products",
     CLIENS: "/clients",
     TAX_RECIPT: "/taxreciept",
     TAX_RECIPT_GOV: "/taxrecieptgov",
     TAX: "/tax",
     USER: "/user",
     RACIEPT: "/reciept",
     HOME: "/home",
     AUTH: "/auth"
}

const ERROR_MESSAGES = {
    NOT_FOUND: "Not found.",
    REGISTERED_USER: "User already registered.",
    INVALID_USER_PASSWORD: "Invalid email or password."
}

const CONNECTION_STRING = {
    DATABASE: "<dbname>",
    PASSWORD: "<password>"
}
module.exports={ ROUTES, ERROR_MESSAGES, CONNECTION_STRING }