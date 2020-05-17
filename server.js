// server.js
// where your node app starts

// init project
var express = require('express');
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



    // The API endpoint is GET [project_url]/api/timestamp/:date_string?
    // A date string is valid if can be successfully parsed by new Date(date_string) (JS) . Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
    // If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
    // If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
    // If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }.



// Handle empty requests - Create a new Date

app.get("/api/timestamp", function (req, res) {
  let response = {
      "unix": "",
      "utc": ""
    }
  let date = new Date();
  response.unix = date.getTime();
  response.utc = date.toUTCString();
  res.send(response);
  
})
      
// Create URL Endpoint for date string

app.get("/api/timestamp/:date_string", function (req, res) {
  try {
    let arg = req.params.date_string;
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let response = {
      "unix": "",
      "utc": ""
    }
    
//     Parse Date Function for UNIX Timecode
    
    const parseDate = (unix) => {
      let fixedDate = Number(unix);
      let utc = new Date(fixedDate);
      return utc.toUTCString();
    }
    
//     If date_string is a number, create the response object. unix = date_string, and utc = date_string parsed by function
    
    if(Number(arg)){
      response.unix = arg;
      response.utc = parseDate(arg);
    } 
    
//     If it is not a number, create a new date. 
    else if (isNaN(Date.parse(Number(arg)))) {
      let utc = new Date(arg);
      
      // If the date is not valid, throw an error.
      if (utc.toUTCString() == "Invalid Date") {
        throw "Invalid Date"
      }
//       Otherwise, return the response object.
      response.utc = utc.toUTCString();
      response.unix = utc.getTime();
    }
      

// Send response object
    res.send(response)

  }
// Catch Errors  
  catch(er) {
    res.send({error: er});
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});