// Express
const express = require("express");
const app = express();

// Express routes
const campgroundRoutes = require("./routes/campground.js");
const reviewRoutes = require("./routes/review.js");

// Export mongoose
const mongoose = require("mongoose");

// Export sessiom
const session = require("express-session");

// Export flash
const flash = require("connect-flash");

// Export middleware and engines
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Export custom class
const { redirect } = require("express/lib/response");

const ExpressError = require("./utils/ExpressError.js");

//  Set ejs engine, path and current view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Connect middleware with app
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "thisisasecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

//  Connect to mongoose
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//  Check db connection error/failure
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database Connected"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//  RESTful routing
app.get("/", (req, res) => {
  res.render("home");
});

// Campground Routes
app.use("/campgrounds", campgroundRoutes);

app.use("/campgrounds/:id", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not found", 404));
});

app.use((err, req, res, next) => {
  const { message = "something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(3000, () => console.log("Server listening to port 3000"));
