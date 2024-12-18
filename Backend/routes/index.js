const express = require("express");
const router = express.Router();

// Other root 

const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");

router.use("/categories",categoryRoute);
router.use("/products",productRoute);
router.use("/auth",authRoute);

module.exports = router;