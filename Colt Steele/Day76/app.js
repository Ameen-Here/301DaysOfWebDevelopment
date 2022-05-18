const express = require("express");
const req = require("express/lib/request");
const app = express();

const path = require("path");
const methodOverride = require("method-override");

const Product = require("./models/product.js");

const addFile = require("./seeds.js"); // Function thayt helps us to insert value
const { redirect } = require("express/lib/response");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // to use .ejs as render tempelate
app.use(express.urlencoded({ extended: true })); // For Parsing request body
app.use(methodOverride("_method"));

// Showing all priducts (Index page of products)

app.get("/products", async (req, res) => {
  //   storeFile();
  const products = await Product.find({});
  res.render("products/index", { products });
});

// Creating Products

app.get("/products/new", (req, res) => {
  res.render("products/add.ejs");
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  addFile(name, price, category);
  res.redirect("/products");
});

// Showing details of product

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/details.ejs", { product });
});

// Updating a product

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/update.ejs", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
  });
  res.redirect("/products");
});

// Deleting a product

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen("3000", console.log("App is listening to port 3000"));
