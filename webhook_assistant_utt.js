//CE FICHIER PERMET DE GERER TOUTES LES REQUÊTES RÉALISÉES PAR LE CHATBOT SUR dialogflow

var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var request = require('request');

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/', function(req, res){
var contenu = {nomUtilisateur:"requestTest", contenu:"Message test"}
request.post({
  url:'http://assistantutt.ga:8080/add/userFeedback',
  body: contenu
}), function(err, reponse, body){
  console.log(body);
};
res.json("ok");

  // request('http://assistantutt.ga:8080/get/userFeedback', function(err, reponse, body){
  //   console.log('statusCode:', reponse);
  //   res.send(body);
  // })

});

app.get('/a', (req,res) => res.send("oui"));


app.listen(PORT, () => console.log("En attente sur le port " + PORT));
