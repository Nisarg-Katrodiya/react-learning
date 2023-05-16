const express = require('express');
const router = express.Router();
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

// user
router.use("/user", userRoutes);

// cart
router.use("/auth", authRoutes);

// product
router.use("/product", productRoutes);

module.exports = router;