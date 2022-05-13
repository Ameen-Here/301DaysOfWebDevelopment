const express = require("express");
const app = express();

const { v4: uuid } = require("uuid"); // To create unique id

const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Instead of body parser

app.use(methodOverride("_method")); // TO override Patch or delete in form

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Setting view engine to ejs & create mkdir views

let comments = [
  {
    id: uuid(),
    username: "todd",
    comment: "lol that is so funny",
  },
  {
    id: uuid(),
    username: "skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "SkBerBoi",
    comment: "Please delete your account todd",
  },
  {
    id: uuid(),
    username: "onlySaysWoffWoff",
    comment: "Woff Woff Woff!!!",
  },
];

// Index page of comments

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments, title: "All Comments" });
});

// Show details of specific comment

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { title: "Comments details", comment });
});

//  Add new comment and user and the form to accept the user and comment

app.get("/comments/new", (req, res) => {
  res.render("comments/new", { title: "Add new comment form" });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuid(), username, comment });
  res.redirect("/comments"); // this will redirect to get /comments woth status code 302 something
});

// Update with patch and form to accept the edited comment

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  res.render("comments/edit", { foundComment, title: "Edit comment" });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const { editedComment: newComment } = req.body;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});

// DELETE

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(
  process.env.PORT || 3000,
  console.log("Server listening to port 3000")
);
