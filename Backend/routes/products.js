const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");

// Create new product
router.post("/", async (req, res) => {
    try {
        
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);  // Successful creation status

    } catch (error) {
        console.log("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.log("Error fetching products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
