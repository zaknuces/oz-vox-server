const fs = require('fs');
const path = require('path');

module.exports = {
  // TODO: documentation.
  getData: (req, res) => {
    if (res.push) {
      let eventFilePath = path.join(__dirname, '/../public', '/js/events/Event.js');
      res
        .push('/js/events/Event.js', {})
        .end(fs.readFileSync(eventFilePath));

      let eventManagerFilePath = path.join(__dirname, '/../public', '/js/events/EventManager.js');
      res
        .push('/js/events/EventManager.js', {})
        .end(fs.readFileSync(eventManagerFilePath));

      let eventCssFilePath = path.join(__dirname, '/../public', '/css/events.css');
      res
        .push('/css/events.css', {})
        .end(fs.readFileSync(eventCssFilePath));
    }
    let eventHTMLPath = path.join(__dirname, '/../public', '/events.html');
    res.write(fs.readFileSync(eventHTMLPath));
    res.end();
  }
};
