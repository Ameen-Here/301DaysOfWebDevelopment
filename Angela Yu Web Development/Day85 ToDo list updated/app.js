const express = require("express");
const mongoose = require("mongoose");

// Export middleware and engines
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// To use method override in forms
app.use(methodOverride("_method"));

// Connecting mongoose to mongo db

mongoose
  .connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Database connection error: ${err}`));

mongoose.connection.on("error", (err) => logError(err));

// Mongoose Schemas
const itemsSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

// Models

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);

// Adding items to data base
const item1 = new Item({
  name: "mango",
});

const item2 = new Item({
  name: "grape",
});

const item3 = new Item({
  name: "fish",
});

const defaultItem = [item1, item2, item3];

// Home route
app.get("/", async (req, res) => {
  const foundItem = await List.find({});
  res.render("home", { newListItems: foundItem });
});

// Get a certain listName
app.get("/:listName", async function (req, res) {
  // const day = date.getDate();

  let { listName } = req.params;
  listName = listName.replace(/\s/g, "");
  const foundItem = await List.findOne({ name: listName });

  if (!foundItem) {
    const list = new List({
      name: listName,
      items: defaultItem,
    });
    await list.save();
    res.redirect("/" + listName);
  } else {
    res.render("list", {
      listTitle: foundItem.name,
      newListItems: foundItem.items,
    });
  }
});

// Delete a dbs
app.delete("/", async (req, res) => {
  let { id, listName } = req.body;
  listName = listName.replace(/\s/g, ""); // Removing white space
  // await Item.findByIdAndRemove(id);  This will get deprecated soon
  await List.findOneAndUpdate(
    { name: listName },
    { $pull: { items: { _id: id } } }
  );
  res.redirect("/" + listName);
});

// Add a dbs
app.post("/", async function (req, res) {
  let { listName, name } = req.body;
  listName = listName.replace(/\s/g, "");
  await List.findOneAndUpdate(
    { name: listName },
    { $push: { items: { name } } }
  );
  // foundItem.items.push({ name });
  // foundItem.save();
  res.redirect("/" + listName);
});

// To get about
app.get("/about", function (req, res) {
  res.render("about");
});

// Listen to server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
