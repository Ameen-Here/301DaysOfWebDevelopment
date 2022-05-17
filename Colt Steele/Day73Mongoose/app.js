// getting-started.js
const mongoose = require("mongoose");

// Connecting Mongoose to mongo

mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established with mongoose"))
  .catch((err) => console.log(`Error in connecting with mongoose ${err}`));

mongoose.connection.on("error", (err) => logError(err));

const movieSchema = new mongoose.Schema({
  title: String, // String is shorthand for {type: String}
  year: { type: Number, required: true, min: 1950 },
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// const amadeus = new Movie({
//   title: "Amadeus", // String is shorthand for {type: String}
//   year: 1963,
//   score: 8.2,
//   rating: "R",
// });

// amadeus.save();

// Movie.insertMany([
//   { title: "Drishyam", year: 2013, score: 8.4, rating: "U/A" },
//   { title: "Kammattipadam", year: 2015, score: 8.0, rating: "A" },
//   { title: "DDLJ", year: 1995, score: 9, rating: "U" },
//   { title: "Big B", year: 2010, score: 7.5, rating: "R" },
//   { title: "Forest Gump", year: 1999, score: 9.1, rating: "R" },
// ]);

Movie.findOneAndUpdate(
  { title: "Drishyam" },
  { year: 2021 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("Updated");
    console.log(data);
  })
  .catch((err) => {
    console.log("Not updated");
    console.log(err);
  });

// Printing all movie
Movie.find({}).then((data) => console.log(data));

// Model Static methods

//  Model Instance Methods
