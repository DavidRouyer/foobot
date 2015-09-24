'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var path = require('path');
var request = require('request');

var config = {
  root: path.normalize(__dirname + '/..'),
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0'
};

var app = express();
app.use(compression());

app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
app.use(express.static(path.join(config.root, 'client')));
app.set('appPath', path.join(config.root, 'client'));
app.use(morgan('dev'));

app.use('/api', function(req, res) {
  var url = 'https://api.foobot.io' + req.url;
  var r = null;

  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }

  req.pipe(r).pipe(res);
});

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: path.join(config.root, 'public') });
});

app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
