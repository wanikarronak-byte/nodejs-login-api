const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: Number,
  title: String,
  description: String,
  price: Number,
  delivery_date: String,
  image: String
});

module.exports = mongoose.model("Product", ProductSchema);