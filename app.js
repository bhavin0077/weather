const express = require("express");
const bodyParser=require ("body-parser");
const https = require ("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get ("/" , function (req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req,res){
    const query= req.body.cityName;
    const apiKey="44f1a36ee0e2e7565521dc8f44f93d84";
    const unit = "metric";

const url=("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" +unit );

https.get(url, function (response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData= JSON.parse(data)
        const temp= weatherData.main.temp;
        const weatherDescription= weatherData.weather[0].description
        const icon= weatherData.weather[0].icon
        const imageUL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h3> The temperature in " + query+ " is " + temp + " celsius</h3>");
        res.write ("<img src="+ imageUL +">");
        res.send();
    
    })
})

})

app.listen(process.env.PORT || 3000, function() {
 console.log("server is running on port 3000");
});