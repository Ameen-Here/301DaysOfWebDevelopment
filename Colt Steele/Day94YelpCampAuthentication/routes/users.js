const express = require("express");
const res = require("express/lib/response.js");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");

const catchAsync = require("../utils/catchAsync.js");

router
  .route("/register")
  .get((req, res) => {
    res.render("users/register.ejs");
  })
  .post(
    catchAsync(async (req, res) => {
      try {
        const { username, email, password } = req.body;
        const user = new User({
          email,
          username,
        });
        const newUser = await User.register(user, password);
        req.login(newUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to YelpCamp");
          res.redirect("/campgrounds");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
      }
    })
  );

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    (req, res) => {
      req.flash("success", "Welcome Back!!!");
      const redirectTo = res.locals.returnTo || "/";
      res.locals.returnTo = "";
      res.redirect(redirectTo);
    }
  );

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
