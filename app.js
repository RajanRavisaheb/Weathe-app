const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res)

  {
    //  console.log(req.body.cityName);
    const apikey = "32a1a717843650477036701f9dc3782b";
    const quary = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + quary + "&appid=" + apikey + "&units=metric";

    https.get(url, function(response) {

      //  console.log(response.statusCode);

        response.on("data", function(data) {
          const weatherdata = JSON.parse(data)
          const temp = weatherdata.main.temp
          //   console.log(temp);
          const weatherDescription = weatherdata.weather[0].description
          const icon = weatherdata.weather[0].icon
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.write("<p>weather is " + weatherDescription + "</p>")
          res.write("<h1> Temprature in " + quary + " is " +  temp  + " degrees </h1>")
          res.write("<img src=" + imageURL + ">")
          res.send()
        })

      }

    );
  })

/*

*/

app.listen(3000, function() {
    console.log("server started");
  }

);
