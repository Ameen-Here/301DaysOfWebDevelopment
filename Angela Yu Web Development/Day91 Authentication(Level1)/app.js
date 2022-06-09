const express = require("express");
const app = express();

const ejs = require("ejs");

const mongoose = require("mongoose");

// For path.joiner
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established with mongoose"))
  .catch((err) => console.log(`Error in connecting with mongoose ${err}`));

// To notify if any error occurs in database during connection

mongoose.connection.on("error", (err) => logError(err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { username: email, password } = req.body;
  const userFound = await User.findOne({ email, password });
  if (userFound) res.render("secrets.ejs");
  else res.send("Wrong email or password!! 404");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username: email, password } = req.body;
  await User.insertMany({ email, password });
  res.render("secrets.ejs");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(3000, console.log("Server listening to port 3000"));
