const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
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
  farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm",
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
