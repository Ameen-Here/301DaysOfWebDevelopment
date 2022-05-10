const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log(req.query);
  console.log(req.body);
  res.send(
    "<h1> HELLO WORLD </h1><p>This is a sample server for the purpose of learning express.js.</p"
  );
});

app.get("/r/:subreddit/:create", (req, res) => {
  console.log(req.params);
  res.send(
    `<h1>Browsing the "${req.params.subreddit}" subreddit with tag #${req.params.create}.</h1>`
  );
});

app.get("/r/:subreddit", (req, res) => {
  console.log(req.params);
  res.send(
    `<h1>Browsing the "${req.params.subreddit}" subreddit with no hashtags.</h1>`
  );
});

app.get("*", (req, res) =>
  res.send(
    "<h1> This path is wrong</h1><h2>This path is unknown!!! Please try another path </h2>"
  )
);

// app.use(() => console.log("Server is requested"));

app.listen(3000, function () {
  console.log("Server started listening to port 3000");
});
