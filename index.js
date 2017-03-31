const express = require('express');
const fs = require('fs');
const http = require('http');
const http2 = require('http2');
const morgan = require('morgan');
const path = require('path');

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
  .get('/', (req, res) => {
    res.redirect('/main.html');
  })
  .get('/events', (req, res) => {
    if (res.push) {
      let eventFilePath = path.join(__dirname, 'public', '/js/events/Event.js');
      res
        .push('/js/events/Event.js', {})
        .end(fs.readFileSync(eventFilePath));

      let eventManagerFilePath = path.join(__dirname, 'public', '/js/events/EventManager.js');
      res
        .push('/js/events/EventManager.js', {})
        .end(fs.readFileSync(eventManagerFilePath));

      let eventCssFilePath = path.join(__dirname, 'public', '/css/events.css');
      res
        .push('/css/events.css', {})
        .end(fs.readFileSync(eventCssFilePath));
    }

    let eventHTMLPath = path.join(__dirname, 'public', '/events.html');
    res.write(fs.readFileSync(eventHTMLPath));
    res.end();
  });
