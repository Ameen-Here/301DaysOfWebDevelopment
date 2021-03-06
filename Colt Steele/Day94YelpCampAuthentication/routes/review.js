const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync.js");

const Campground = require("../models/campground");
const Review = require("../models/review");

const { reviewSchema } = require("../schemas");

const { isLoggedIn } = require("../middleware.js");

//  Validation
const validateReview = (req, _, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/review",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Successfully added a review");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/reviews/:reviewId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("error", "Successfully deleted a review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
