const express = require("express");

// For setting directory
// const path = require("path");

const app = express();

const articleRoute = require("./routes/articles.js");

app.use(express.urlencoded({ extended: true }));

// If using ejs and public for assets
// app.set("vies", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static("public"));

app.use("/", articleRoute);

app.listen(3000, console.log("Listening to port 3000"));
