var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var route = require('./api-route');
var dataLayer = require('./dataLayer');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

route(app);
dataLayer.init(function(){
      const port = process.env.PORT || 8080
      app.listen(port);
      console.log("on utilise le port: 8080");
});
