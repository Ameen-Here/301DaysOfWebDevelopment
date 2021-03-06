const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync.js");

const Campground = require("../models/campground");
const Review = require("../models/review");

const { isLoggedIn, validateReview, isReviewId } = require("../middleware.js");

router.post(
  "/review",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
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
  isReviewId,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("error", "Successfully deleted a review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
