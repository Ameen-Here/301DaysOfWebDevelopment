const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const path = require("path");

// Import User dbs
const User = require("./models/user.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//  Connect to mongoose
mongoose.connect("mongodb://localhost:27017/loginDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  Check db connection error/failure
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database Connected"));

// Middleware for login check
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// Routes

// Home route

app.get("/", (req, res) => {
  res.send("Homepage");
});

// Register route

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/secret");
});

// Login route

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { username, password: pw } = req.body;
  const foundUser = await User.findAndValidate(username, pw);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect("/secret");
  } else res.send("Username or password incorrect");
});

// Logout route

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

// Secret page route

app.get("/secret", requireLogin, (req, res) => {
  res.render("secret.ejs");
});

// Server listening to port 3000

app.listen(3000, console.log("Listening to port 3000"));

// login(hashPw, "mon");
