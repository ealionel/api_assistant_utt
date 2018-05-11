var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var { WebhookClient } = require('dialogflow-fulfillment');

app.get('/', function{
  var agent = new WebhookClient({request:request, response: response});


});


app.listen(8080);
