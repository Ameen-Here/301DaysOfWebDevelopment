const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    enum: ["Fruits", "Vegetables", "Diary"],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
