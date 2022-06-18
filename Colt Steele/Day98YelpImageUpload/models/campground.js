const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");

// Campground Schema
const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  imageUrl: [{ url: String, filename: String }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Add middleware for deleting reviews inside camp
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
