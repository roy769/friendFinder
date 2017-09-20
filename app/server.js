//Dependecies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//set up express app

var app = express();
var PORT = process.env.PORT || 3000;
console.log("working");
//set up the express app to handle data parsing

app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
