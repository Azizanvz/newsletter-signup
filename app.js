//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
      email_address: email,
      status: "subscribed"
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url : "https://us4.api.mailchimp.com/3.0/lists/08725bf4ec/members",
    method: "POST",
    headers:{
      Authorization: "aziza 4edd981836987cc4f717811d40850a8d-us4",
      "Content-Type": "application/json"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }else {
      console.log(response.statusCode);
      if (response.statusCode == "200") {
        res.sendFile(__dirname + "/success.html");
      }else {
        res.sendFile(__dirname + "/failure.html");
      }

    }
  });

  //my API key 4edd981836987cc4f717811d40850a8d-us4
  //audience id: 08725bf4ec
});

app.get("/failure", function(req, res){
  res.redirect("/");
})

app.listen("3000", function(){
  console.log("Server is running on port 3000");
})
