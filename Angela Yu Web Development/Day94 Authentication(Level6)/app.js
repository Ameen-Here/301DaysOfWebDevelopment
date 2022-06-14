const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("Express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

// For path.joiner
const path = require("path");
const { use } = require("passport");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "Thisisourlittlesecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

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
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/secret", (req, res) => {
  console.log("Here");
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("secrets.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/register",
  }),
  (req, res) => {
    console.log("hello");
    res.render("secrets.ejs");
  }
);

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  const newUser = await User.register(user, password);
  console.log(username, email, password);
  console.log("here1");
  req.login(newUser, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/secret");
  });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return redirect("/register");
    res.redirect("/");
  });
});

app.listen(3000, console.log("Server listening to port 3000"));
