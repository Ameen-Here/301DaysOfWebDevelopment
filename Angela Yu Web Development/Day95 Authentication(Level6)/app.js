require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("Express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

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
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

app.get("/secrets", async (req, res) => {
  const users = await User.find({ secret: { $ne: null } });
  res.render("secrets.ejs", { userWithSecret: users });
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
    res.redirect("/secrets");
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
    res.redirect("/secrets");
  });
});

app.get("/submit", (req, res) => {
  res.render("submit.ejs");
});

app.post("/submit", async (req, res) => {
  const { secret } = req.body;
  console.log(req.user);
  console.log(req.user.id);
  const user = await User.findById(req.user.id);
  user.secret = secret;
  await user.save();
  res.redirect("/secrets");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return redirect("/register");
    res.redirect("/");
  });
});

app.listen(3000, console.log("Server listening to port 3000"));
