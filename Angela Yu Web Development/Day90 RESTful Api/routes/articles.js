const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("Database is successfully connected"))
  .catch((err) => console.log(`Error while connecting to database, ${err}`));

mongoose.connection.on("error", (err) => logError(err));

const wikiSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", wikiSchema);

// All articles delete, update and view methods
router
  .route("/articles")

  .get(async (req, res) => {
    const articles = await Article.find();
    console.log(articles);
    if (articles.length === 0) res.send("Empty Wiki");
    else res.send(articles);
  })

  .post(async (req, res) => {
    const { title, content } = req.body;
    if (title.length === 0 && content.length === 0) res.send("error 404!!!");
    else {
      Article.insertMany({ title, content });
      res.redirect("/articles");
    }
  })

  .delete(async (req, res) => {
    await Article.deleteMany();
    res.redirect("/articles");
  });

// Each article delete, update and view methods
router
  .route("/articles/:articleName")

  .get(async (req, res) => {
    const { articleName } = req.params;
    const article = await Article.find({ title: articleName });
    res.send(article);
  })

  .put(async (req, res) => {
    const { title, content } = req.body;
    const { articleName } = req.params;
    await Article.Update(
      { title: articleName },
      { title, content },
      { overwrite: true }
    );
    res.redirect(`/articles/${articleName}`);
  })

  .patch(async (req, res) => {
    const { articleName } = req.params;
    await Article.Update({ title: articleName }, { $set: req.body });
    res.redirect(`/articles/${articleName}`);
  })

  .delete(async (req, res) => {
    const { articleName } = req.params;
    await Article.deleteOne({ title: articleName });
    res.redirect("/articles/");
  });

module.exports = router;
