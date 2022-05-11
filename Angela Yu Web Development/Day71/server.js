const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// const axios = require("axios");  --- For doing axios method instead of https

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// const weatherData = async function (url) {
//   try {
//     const res = await axios.get(url);
//     return res.data.main;
//   } catch (err) {
//     console.log(err.message);
//   }
// };   ------- Async function to get weather data

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const apiId = "8131d977de6c6b77523cc5ebf4dd43f6";
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=${units}`; // From postman

  https.get(url, function (response) {
    if (response.statusCode !== 200) res.send("Wrong city name!!! Try Again");
    else {
      response.on("data", function (data) {
        // console.log(data); ---------- Will give back hecadecimal values.
        const weatherDatas = JSON.parse(data);
        //   console.log(weatherDatas);
        const dataNecessary = {};
        dataNecessary.temperature = weatherDatas.main.temp;
        dataNecessary.description = weatherDatas.weather[0].description;
        dataNecessary.icon = weatherDatas.weather[0].icon;
        res.send(
          `<p> The weather is currently ${dataNecessary.description} </p>
        <h1> The weather in ${weatherDatas.name} is ${dataNecessary.temperature} degree celsious.</h1><img src="http://openweathermap.org/img/wn/${dataNecessary.icon}@2x.png" alt="Icon" /> `
        );
      });
    }
  });

  //   res.sendFile(`${__dirname}/index.html`);

  //   const weatherDatas = await weatherData(url);
  //   console.log(weatherDatas); -----  Axios way of getting data; we need async func
});

app.listen(3000, function () {
  console.log("Server is listening to port 3000");
});
