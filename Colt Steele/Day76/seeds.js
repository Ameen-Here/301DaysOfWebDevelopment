const Product = require("./models/product.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Successful connection");
  })
  .catch((err) => {
    console.log(`Error in connection ${err}`);
  });

const addFile = async function (name, price, category) {
  Product.insertMany([
    {
      name,
      price,
      category,
    },
  ])
    .then((data) => console.log("Value Inserted"))
    .catch((err) => console.log(`Error ${err}`));
};

module.exports = addFile;
