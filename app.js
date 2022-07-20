const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city = req.body.city;
    const apiID = "076a5eee69adaaddaf34b624f1efb45e";
    const unit = "metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiID+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const iconId = weatherData.weather[0].icon;
            const icon = "https://openweathermap.org/img/wn/"+iconId+"@2x.png"

            res.write("<h1> In  "+ city +" tempreture is "+ temp+"  celcius </h1>");
            res.write("<h2>weather is  "+desc+"</h2>");
            res.write("<Img src="+icon+"></Img>");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("server is linstening on port 3000");
});