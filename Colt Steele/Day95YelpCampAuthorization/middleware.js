const { reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError.js");

const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in to perform that action");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author._id.equals(req.user._id)) {
    req.flash("error", "You are not allowed to do that.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewId = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "You are not allowed to do that.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

//  Validation
module.exports.validateReview = (req, _, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
