const express = require('express');
const fs = require('fs');
const http = require('http');
const http2 = require('http2');
const morgan = require('morgan');
const path = require('path');

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
  .use(express.static('public'))
  .use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
  .use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))


  .get('/', (req, res) => {
    return dashboardRoute.getData(req, res);
  })

  .get('/events', (req, res) => {
    return eventsRoute.getData(req, res);
  });
