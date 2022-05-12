const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/failure", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const { firstName, lastName, email } = req.body;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/8f20b2f155";

  const options = {
    method: "POST",
    // auth: "ameen1 :baluek377823f7d418708e217f4d1fd1de466-us9",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);

  request.end();
});

// process.env.PORT for heroku
app.listen(
  process.env.PORT || 3000,
  console.log("server is listening to port 3000")
);
