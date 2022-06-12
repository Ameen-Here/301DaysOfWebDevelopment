const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");

const Campground = require("../models/campground");

router
  .route("/")
  .get(
    catchAsync(async (req, res) => {
      const campgrounds = await Campground.find({});
      res.render("campgrounds/index", { campgrounds });
    })
  )
  .post(
    catchAsync(async (req, res, next) => {
      const camp = new Campground(req.body.campground);
      await camp.save();
      req.flash("success", "Successfully made a new campground");
      res.redirect("/campgrounds");
    })
  );

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

router
  .route("/:id")
  .get(
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findById(id).populate("reviews");
      if (!campground) {
        req.flash("error", "Cannot find the campground");
        res.redirect("/");
      }
      res.render("campgrounds/show", { campground });
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const { id } = req.params;
      await Campground.findByIdAndDelete(id);
      req.flash("error", "Successfully deleted a campground");
      res.redirect("/campgrounds");
    })
  )
  .put(
    catchAsync(async (req, res) => {
      const { id } = req.params;
      await Campground.findByIdAndUpdate(id, { ...req.body.campground });
      req.flash("success", "Successfully updated the campground");
      res.redirect(`/campgrounds/${id}`);
    })
  );

module.exports = router;
