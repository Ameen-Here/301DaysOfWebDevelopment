const mongoose = require("mongoose");
const Product = require("./product.js");

const { Schema, model } = mongoose;

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  city: {
    type: String,
  },
  email: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// Adding delete middleware to delete products after farm deletion

farmSchema.post("findOneAndDelete", async (farm) => {
  if (farm.products.length) {
    const result = await Product.deleteMany({ _id: { $in: farm.products } });
    console.log(result);
  }
});

const Farm = model("Farm", farmSchema);
module.exports = Farm;
