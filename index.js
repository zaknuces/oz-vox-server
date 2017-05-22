const express = require('express');
const fs = require('fs');
const http = require('http');
const http2 = require('http2');
const morgan = require('morgan');
const path = require('path');
const randomQuote = require('random-quote');

const eventsRoute = require('./src/events');
const dashboardRoute = require('./src/dashboard');

// Create Express Application
const app = express();

// Make HTTP2 work with Express (this must be before any other middleware)
require('express-http2-workaround')({ express: express, http2: http2, app: app });

// create a write stream (in append mode)
const logDirectory = './logs';
if (!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
};

const options = {
  key: fs.readFileSync('./node_modules/http2/example/localhost.key'),
  cert: fs.readFileSync('./node_modules/http2/example/localhost.crt')
};

let accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {
  flags: 'a'
});

http2
  .createServer(options, app)
  .listen(443, () => {
    console.log('Express HTTP 2 server up and running.');
  });

http
  .Server(app)
  .listen(80, () => {
    console.log('Express HTTP 1 server up and running.');
  });

app
  .use(morgan('combined', {
    stream: accessLogStream
  }))
  //.use(express.static('public', { maxAge: 86400000 /* 1d */ }))
  .use(express.static('public'))
  .use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
  .use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))


  .get('/', (req, res) => {
    return dashboardRoute.getData(req, res);
  })

  .get('/events', (req, res) => {
    return eventsRoute.getData(req, res);
  })

  .get('/quote', (req, res) => {
    randomQuote()
      .then(quote => res.json(quote));
  })

  .get('/travelLogs', (req, res) => {
    console.log(req.query);
    if (req.query && req.query.serverPush !== undefined && res.push) {
      console.log('Serve Push resources');
      let imageFilePath = path.join(__dirname, '/public', '/images/porto1.jpg');
      res
        .push('/images/porto1.jpg', {})
        .end(fs.readFileSync(imageFilePath));

      imageFilePath = path.join(__dirname, '/public', '/images/porto2.jpg');
      res
        .push('/images/porto2.jpg', {})
        .end(fs.readFileSync(imageFilePath));

      imageFilePath = path.join(__dirname, '/public', '/images/porto3.jpg');
      res
        .push('/images/porto3.jpg', {})
        .end(fs.readFileSync(imageFilePath));

      imageFilePath = path.join(__dirname, '/public', '/images/porto4.jpg');
      res
        .push('/images/porto4.jpg', {})
        .end(fs.readFileSync(imageFilePath));

      imageFilePath = path.join(__dirname, '/public', '/images/porto5.jpg');
      res
        .push('/images/porto5.jpg', {})
        .end(fs.readFileSync(imageFilePath));
    }
    res.json([{
      details: "Trip to Porto, Protugal",
      images: [{
        url: 'images/porto1.jpg'
      }, {
        url: 'images/porto2.jpg'
      }, {
        url: 'images/porto3.jpg'
      }, {
        url: 'images/porto4.jpg'
      }, {
        url: 'images/porto5.jpg'
      }]
    }])
  });
