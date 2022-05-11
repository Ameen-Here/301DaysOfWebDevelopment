const express = require("express");
const bodyParser = require("body-parser");

const redditDatas = require("./data.json");

const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(`${__dirname}/views`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  console.log(typeof subreddit);
  const datas = redditDatas[subreddit];
  console.log(redditDatas);
  console.log(datas);
  if (datas) res.render("reddit", { ...datas });
  else res.render("Notfound", { subreddit });
});

app.get("/cats", (req, res) => {
  const catNames = ["pawchu", "mia", "teo", "blackie"];
  res.render("cats", { catNames });
});

app.get("/random", (req, res) => {
  const randNum = Math.floor(Math.random() * 100) + 1;
  res.render("random", { randNum1: randNum });
});

app.listen(3000, () => console.log("Server is listening to port 3000"));
