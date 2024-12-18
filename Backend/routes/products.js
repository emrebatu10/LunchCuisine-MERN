const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");

// Create new product
router.post("/", async (req, res) => {
    try {
        
        const newProduct = newProduct( req.body );
        await newProduct.save();
        res.status(201).json(newProduct); // success status code 

    } catch (error) {
        console.log(error)
    }
})

//  Get  all products
router.get("/", async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})

module.exports = router;