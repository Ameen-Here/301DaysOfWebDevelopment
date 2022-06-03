const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");

const Product = require("./models/product.js");
const Farm = require("./models/farm.js");

const addFile = require("./seeds.js"); // Function thayt helps us to insert value
const { redirect } = require("express/lib/response");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // to use .ejs as render tempelate
app.use(express.urlencoded({ extended: true })); // For Parsing request body
app.use(methodOverride("_method"));

// FARM ROUTES

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index.ejs", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new.ejs");
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/details.ejs", { farm });
});

app.get("/farms/:id/products/add", async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  res.render("products/add.ejs", { farm });
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const farm = await Farm.findById(id);
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect("/farms");
});

app.delete("/farms/:id", async (req, res) => {
  const response = await Farm.findByIdAndDelete(req.params.id);
  console.log(response);
  console.log("done deleting farm");
  res.redirect("/farms");
});

// PRDOCT ROUTES

// Showing all priducts (Index page of products)

app.get("/products", async (req, res) => {
  //   storeFile();
  const products = await Product.find({});
  res.render("products/index.ejs", { products });
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
  const product = await Product.findById(id).populate("farm");
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
