var express = require('express');
var fs = require('fs');
var http = require('http');
var http2 = require('http2');
var morgan = require('morgan');
var path = require('path');

// Create Express Application
var app = express();

// Make HTTP2 work with Express (this must be before any other middleware)
require('express-http2-workaround')({ express: express, http2: http2, app: app });

// create a write stream (in append mode)
var logDirectory = './logs';
if (!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
}
var accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {flags: 'a'})

var options = {
  key: fs.readFileSync('./node_modules/http2/example/localhost.key'),
  cert: fs.readFileSync('./node_modules/http2/example/localhost.crt')
};

http2
  .createServer(options, app)
  .listen(443, function() {
    console.log("Express HTTP 2 server up and running.");
  });

http
  .Server(app)
  .listen(80, function() {
    console.log("Express HTTP 1 server up and running.");
  });

app
  .use(morgan('combined', {stream: accessLogStream}))
  .use(express.static('public'))
  .get('/', function (req, res) {
    res.redirect('/main.html');
  });
