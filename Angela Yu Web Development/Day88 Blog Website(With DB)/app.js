// Express setup

const express = require("express");
const app = express();

// Import movie db
const MovieDB = require("./blogDBSchema.js");

// Require mongo and connect it to local server

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established with mongoose"))
  .catch((err) => console.log(`Error in connecting with mongoose ${err}`));

// To notify if any error occurs in database during connection

mongoose.connection.on("error", (err) => logError(err));

// For path.joiner

const path = require("path");

// Set engine as ejs

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use certain property for express

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Content for about and contact

const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus.";

//  Handle route for home page
app.get("/", async (req, res) => {
  const posts = await MovieDB.find();
  console.log(posts);
  res.render("home.ejs", {
    title: "Home",
    posts,
  });
});

//  Handle route for contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    startingContent: contactContent,
    title: "Contact",
  });
});

//  Handle route for about page
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    startingContent: aboutContent,
    title: "About",
  });
});

//  Handle route for compose page
app.get("/compose", (req, res) => {
  res.render("compose.ejs", { title: "Compose" });
});

// Post the data into the db and redirect to home page
app.post("/", async (req, res) => {
  const { postTitle, postBody } = req.body;
  const post = {
    title: postTitle,
    content: postBody,
  }; // Express routing params

  await MovieDB.insertMany(post);
  // Push the new data to db
  res.redirect("/");
});

//  Handle route for post page
app.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const resPost = await MovieDB.findById(postId); // Find post with search title
  res.render("post.ejs", {
    title: !resPost ? "Post Not Found" : resPost.title,
    resPost,
  });
});

//  Server listen to port 3000
app.listen("3000", console.log("Server listening to port 3000"));
