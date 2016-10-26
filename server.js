'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');

var port = process.env.PORT || '1337';

var	app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Serve Static Resources **/
app.use('/', express.static(path.join(__dirname, '/public')));

/** Mock APIs **/
app.get('/api', function(request, response){
  console.log(request.query.reportname, request.query.reporttype);
  console.log(responses[request.query.reportname][request.query.reporttype]);
	response.json(responses[request.query.reportname][request.query.reporttype]);
});

app.get('/tabledata', function(request, response){
  console.log(request.query);
  if(request.query.table === 'bookt'){
    response.json(['USERNAME','TOTAL_PRICE','DEPART_CITY','DEPART_DATE','SITENAME','FIRSTNAME','LASTNAME','SEAT_CLASS']);
  }
  else if(request.query.table === 'airb'){
    response.json(['ORD_KEY','SEGMENT','AIRLINE','FLIGHTNO','BOOKING_CLASS','FROMCITY','TOCITY']);
  }
  else if(request.query.table === 'hotelb'){
    response.json(['ORD_KEY','BOOKDATE','CHECKIN_DATE','CHECKOUT_DATE','HOTELNAME','HOTELCHAIN','ROOMS']);
  }
  else if(request.query.table === 'carb'){
    response.json(['ORD_KEY','BOOKDATE','PICKUP_DATE','DROPOFF_DATE','PICKUP_CTY','DROPOFF_CTY','VENDOR','RATE']);
  }
  response.status('404');
});

app.post('/pdf', function(request, response){
	let doc = new PDFDocument();
  try {
    let pathFromRoot = '/assets/docs/Report.pdf';
    let pathToPDF = path.join(__dirname, '/public' + pathFromRoot);
    let stream = fs.createWriteStream(pathToPDF);
    doc.pipe(stream);
    //PDF Content
    // doc.text(request.body.title || 'Generated Report');
    doc.image(request.body.png, 0, 100, {width: 600});
    doc.end();
    response.json({resource_url: pathFromRoot})      
  }
  catch(error){
    response.end(error);
  }
});

app.listen(port, function() {
  console.log('Node app running on port ' + port);
})

var responses = {};
responses.adoption = {};
responses.adoption.default = {
  "labels": [
    "Online",
    "Offline"
  ],
  "data": [
    50,
    2
  ]
};

responses.adoption.site = {
  "labels": [
    "accenture2us",
    "accenture2gb",
    "accenture2fr"
  ],
  "series": [
    "offline",
    "online"
  ],
  "data": [
    [
      20,
      30,
      10
    ],
    [
      2,
      5,
      1
    ]
  ]
};

responses.adoption.month = {
  "labels": [
    "Dec 2015",
    "Jan 2016"
  ],
  "series": [
    "offline",
    "online"
  ],
  "data": [
    [
      20,
      49
    ],
    [
      300,
      79
    ]
  ]
};

responses.adoption.year = {
  "labels": [
    "2015",
    "2016"
  ],
  "series": [
    "offline",
    "online"
  ],
  "data": [
    [
      20,
      49
    ],
    [
      300,
      79
    ]
  ]
};

responses.benchmark = {};
responses.benchmark.month = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  series: ["Company", "Industry Average"],
  data: [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ]
};

responses.benchmark.year = {
  labels: ["2015", "2016"],
  series: ["Company", "Industry Average"],
  data: [
    [65, 59],
    [28, 48]
  ]
};

responses.cost = {};
responses.cost.default = {
  labels: ["Air", "Hotel", "Car", "Rail"],
  data: [8954, 1780, 230, 420 ]
};

responses.count = {};

responses.count.default = {
  labels: [
    "Air",
    "Hotel",
    "Car",
    "Rail"
  ],
  data: [
    40,
    15,
    6,
    2
  ]
};