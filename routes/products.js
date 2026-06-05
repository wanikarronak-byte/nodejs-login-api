const express = require("express");
const router = express.Router();

const Product = require("../Models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;