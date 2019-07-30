// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
  res.json({"unix": moment().valueOf(), "utc" : moment().utc().format("dddd, MMMM Do YYYY, h:mm:ss a, z")})
})

app.get("/api/timestamp/:date_string", function (req, res) {
  let dString = req.params.date_string
  let testDate = moment(dString).isValid()
  let testUnixS = moment.unix(dString).isValid()
  
  console.log(moment(parseInt(dString)))
  
  if (testDate === false && testUnixS === false) {
    res.json({"unix": null, "utc" : "Invalid Date" })
  }
  else {
    if (testDate === true) {
      res.json({"unix": moment(dString).valueOf(), "utc" : moment(dString).utc().format("dddd, MMMM Do YYYY, h:mm:ss a, z")})
    }
    if (testUnixS === true && dString.toString().length === 13) {
      res.json({"unix": dString, "utc" : moment(parseInt(dString)).utc().format("dddd, MMMM Do YYYY, h:mm:ss a, z")})
    }
    else {
      let retVal = moment.unix(dString).valueOf()
      res.json({"unix": retVal, "utc" : moment(retVal).utc().format("dddd, MMMM Do YYYY, h:mm:ss a, z")})
    }
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});