const express = require("express");
// Requiring Body-parser
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", function (req, res) {
  //   console.log(req);
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);

  const result = num1 + num2;
  res.send(`The result of calculation is ${result}`);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
