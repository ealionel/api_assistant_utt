//CE SCRIPT PERMET DE LANCER L'API QUI PERMET DE RÉCUPERER TOUS LE CONTENU DES QUESTIONS

var bodyParser = require('body-parser');

var mysql = require('mysql');
var express = require('express');
var app = express();

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assistant_mini'
});

con.connect(function(err){
  if (err) throw err;
  console.log('Connexion à la base donnée OK')
});

app.use(bodyParser.json());


function ajouterMessageFeedback(req, res, next){

}

//Juste une fonction qui permet d'afficher dans la console le contenu de la requête et de la renvoyer
function echoRequete(req, res, next){
  var reqTotal = [req.headers].concat( [req.body] );
  res.json(reqTotal);
  console.log(reqTotal);

  next();
}

function handleError(err, req, res, next){
  if (err instanceof SyntaxError){
    console.log(err);
    res.send(err);
  }

  next();
}

app.post('/echo', echoRequete, function(req, res){ } );
app.use(handleError);

app.listen(8080);
