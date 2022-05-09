const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/bmiCalc.html`);
});

app.post("/", function (req, res) {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);
  const bmi = weight / (height * height);
  res.send(`Your BMI is ${bmi.toFixed(2)}`);
});

app.listen("3000", function () {
  console.log("Server running on port 3000");
});
