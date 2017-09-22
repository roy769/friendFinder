//Dependecies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//set up express app

var app = express();
var PORT = process.env.PORT || 3000;
console.log("working");
//set up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
//DATA
var friends =
  [{
  id_number: 777,
  name:"Shaquille",
  photo:"http://4.bp.blogspot.com/-JfQKblOBOls/Teci6bYBkHI/AAAAAAAAAQM/INVKTU44yp0/s1600/shaq.jpg",
  scores:[
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2
]
},
{
  id_number: 213,
  name:"Kobe",
  photo:"http://i.imgur.com/Tbzu6QY.jpg",
  scores:[
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ]
},
{
  id_number: 666,
  name:"Beyonce",
  photo:"https://i.pinimg.com/originals/4d/9b/58/4d9b582e7aff2eba9d2293aaa29fd142.jpg",
  scores:[
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3
    ]
},
{
  id_number: 1010,
  name:"Nikki",
  photo:"http://ralisfx.com/blog/wp-content/uploads/2013/08/533102_10150781190316369_117143282_n.jpg",
  scores:[
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ]
},
{
  id_number: 6969,
  name:"Xena",
  photo:"https://i.pinimg.com/736x/93/3d/6d/933d6d40ffd099c5af3c82566d6ce501--warrior-queen-xena-warrior-princess.jpg",
  scores:[
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4
    ]
},
{
  id_number: 999,
  name:"William",
  photo:"http://www.indiewire.com/wp-content/uploads/2016/02/star-trek-shatner.jpg",
  scores:[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
},
{
  id_number: 555,
  name:"Wendy",
  photo:"https://i.ytimg.com/vi/w4jFvWQ_IGc/maxresdefault.jpg",
  scores:[
      2,
      1,
      4,
      4,
      3,
      1,
      2,
      1,
      4,
      1
    ]
},
{
  id_number: 0404,
  name:"Santa",
  photo:"http://static1.squarespace.com/static/5512e30de4b018f9300e3a55/551391f5e4b09de0ff5e04a5/567cb01a1c1210bb27409d50/1451014122605/?format=1000w",
  scores:[
      1,
      1,
      4,
      4,
      1,
      1,
      2,
      5,
      1,
      1
    ]
},
{
  id_number: 000,
  name:"Dennis",
  photo:"https://static.vibe.com/files/images/dennisrodmanincostume-445x560.jpeg",
  scores:[
      2,
      1,
      4,
      4,
      2,
      1,
      2,
      2,
      2,
      1
    ]
},
{
  id_number: 888,
  name:"Bruce",
  photo:"http://i0.wp.com/radaronline.com/wp-content/uploads/2015/05/bruce-jenner-surgery-face-feminine-02.jpg?resize=990%2C551",
  scores:[
      1,
      1,
      4,
      4,
      1,
      1,
      2,
      1,
      1,
      1
           ]
  }];
  app.get("/", function(req,res)
    {
        res.sendFile(path.join(__dirname, "public/home.html"));
    });

    app.get("/survey", function(req,res)
    {
        res.sendFile(path.join(__dirname, "public/survey.html"));
    });

    //Get all friends
    app.get("/friends", function(req, res)
    {
        res.json(friends);
    });

    //member search -provides json
    app.get("/api/:friends?", function(req,res)
    {
        var chosen = req.params.friends;

        if (chosen)
        {
            console.log(chosen);

              for (var i = 0; i < friends.length; i++)

              {
                if (chosen === friends[i].name)
                {
                    return res.json(false);
                }
                return res.json(friends);
              }
        }
    });

    //create new friends
    app.post("/friends/new", function(req, res)
    {
        var newFriends = req.body;
        // newFriends.id_number = newFriends.name.replace(/\s+/g,"").toLowercase();

        console.log(newFriends);

        friends.push(newFriends);

        res.json(newFriends);

        //grab scores(modyfied from StefanieDing code)
        var newFriendsScores = req.body.scores;

        var scoresArray = [];

        var friendCount = 0;

        var bestMatch = 0;

        //iterate friends

        for(var i =0; i < newFriends.length; i++)
        {
          var diffScore = 0;

          //compare friends
          for (var j =0; j < newFriendsScores.length; j++)
          {
            diffScore += (Math.abs(parseInt(friendsList[i].scores[j])-parseInt(newFriendsScores[j])));
          }
          //push it
            scoresArray.push(diffScore);
        }
        //compare aftermath
        for (var i =0; i < scoresArray.length; i++)
        {
          if (scoresArray[i] <= scoresArray[bestMatch])
          {
            bestMatch = i;
          }
        }
        //return bestMatch
        var match = newFriends[bestMatch];

        res.json(match);

        newFriends.push(req.body);
    });




//server is listening
app.listen(PORT, function ()
{
    console.log("Live on PORT" + PORT);
});
