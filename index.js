var express = require('express');
var fs = require('fs');
var http2 = require('http2');
var app = express();

express.request.__proto__ = http2.IncomingMessage.prototype;
express.response.__proto__ = http2.ServerResponse.prototype;

var options = {
  key: fs.readFileSync('./node_modules/http2/example/localhost.key'),
  cert: fs.readFileSync('./node_modules/http2/example/localhost.crt')
};

app.use(express.static('public'));

app.get('/', function (req, res) {
  //res.send('Hello World');
  res.redirect('/main.html');
});

http2.createServer(options, app).listen(3001);
