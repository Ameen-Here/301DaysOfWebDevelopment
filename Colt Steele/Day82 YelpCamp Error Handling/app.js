// Express
const express = require("express");
const app = express();

// Export mongoose
const mongoose = require("mongoose");

// Export middleware and engines
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Export custom class
const { redirect } = require("express/lib/response");
const Campground = require("./models/campground");

const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressError.js");

//  Set ejs engine, path and current view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Connect middleware with app
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//  Connect to mongoose
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//  Check db connection error/failure
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database Connected"));

//  RESTful routing
app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect("/campgrounds/");
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/show", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not found", 404));
});

app.use((err, req, res, next) => {
  const { message = "something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(3000, () => console.log("Server listening to port 3000"));
