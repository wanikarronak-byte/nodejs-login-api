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

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
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