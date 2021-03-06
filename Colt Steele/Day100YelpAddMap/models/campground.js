const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");

// Image Schema and virtual property
const ImageSchema = new Schema({
  url: String,
  filename: String,
});

// ImageSchema.virtual("thumbnail").get(function () {
//   return this.url.replace("/upload", "/upload/w_200");
// });

// ImageSchema.virtual("cardImg").get(function () {
//   return this.url.replace("/upload/", "/upload/w_200/");
// });

// Campground Schema
const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  imageUrl: [ImageSchema],
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
