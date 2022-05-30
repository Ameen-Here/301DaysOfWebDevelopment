//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

// Mongoose Schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

// Model

const Item = mongoose.model("Item", itemsSchema);

// Adding items to data base
// const mangoItem = new Item({
//   name: "mango",
// });

// mangoItem.save();

// Item.insertMany([
//   {
//     name: "apple",
//   },
//   {
//     name: "Grape",
//   },
// ]);

const insertDefaultValues = async function () {
  await Item.insertMany([
    {
      name: "apple",
    },
    {
      name: "Grape",
    },
  ]);
};

app.get("/", async function (req, res) {
  // const day = date.getDate();

  const items = await Item.find({});
  console.log("reached here");
  console.log(items);

  if (items.length === 0) {
    insertDefaultValues();
  }

  res.render("list", { listTitle: "Today", newListItems: items });

  //////////////////
  // let { listName } = req.params;
  // let newItem;
  // mongoose.connection.db
  //   .listCollections({ name: listName })
  //   .next(async function (err, collinfo) {
  //     if (collinfo) {
  //       newItem = await listName.find({});
  //     } else {
  //       let listName = await mongoose.model(
  //         `${listName.charAt(0).toUpperCase() + listName.slice(1)}`,
  //         itemsSchema
  //       );
  //       newItem = await lis.find({});
  //       if (newItem.length === 0) {
  //         insertDefaultValues(item);
  //       }
  //     }
  //     res.render("list", {
  //       listTitle: "Today",
  //       newListItems: newItem,
  //       listName,
  //     });
  //   });
});

app.delete("/", async (req, res) => {
  const { id } = req.body;
  console.log(typeof id);
  // await Item.findByIdAndRemove(id);  This will get deprecated soon
  await Item.deleteOne({ _id: id });
  res.redirect("/");
});

app.post("/", async function (req, res) {
  console.log(req.body);
  await Item.insertMany(req.body);
  res.redirect("/");
});

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
