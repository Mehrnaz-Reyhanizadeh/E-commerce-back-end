const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
