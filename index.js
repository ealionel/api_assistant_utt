//CE SCRIPT PERMET DE LANCER L'API QUI PERMET DE RÉCUPERER TOUS LE CONTENU DES QUESTIONS

var bodyParser = require('body-parser');

var mysql = require('mysql');
var express = require('express');
var app = express();

var PORT = process.env.PORT || 8080;

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assistant_utt'
});

db.connect(function(err){
  if (err) throw err;
  console.log('Connexion à la base donnée OK')
});

app.use(bodyParser.json());

//Juste une fonction qui permet d'afficher dans la console le contenu de la requête et de la renvoyer
function echoRequete(req, res, next){
  var reqTotal = [req.headers].concat( [req.body] );
  res.json(reqTotal);
  console.log(reqTotal);

  next();
}

function addUserFeedback(nom, contenu){
  var requete = 'INSERT INTO feedback_utilisateurs (nom_utilisateur, contenu) VALUES ("' + mysql.escape(nom) + '", "' + mysql.escape( contenu ) + '")';
  db.query(requete, function(err,result, fields){
    if (err) throw err;
    console.log("Ajout de %s : %s", nom, contenu);
  });
}

function getUserFeedback(option){
  var requete = 'SELECT * FROM feedback_utilisateurs'
  var resultats;
  var test = "test";

  db.query(requete, function(err, result, fields){
    if(err) throw err;
    resultats = result;
  });

  console.log(resultats);

  return resultats;
}

function handleError(err, req, res, next){
  if (err instanceof SyntaxError){
    console.log(err);
    res.send(err);
  }

  next();
}


app.post('/echo', echoRequete, function(req, res){});

app.post('/add/userFeedback', function(req, res){
  if(req.body.nomUtilisateur != undefined & req.body.contenu != undefined){
    addUserFeedback(req.body.nomUtilisateur, req.body.contenu);
    res.status(201);
    res.send(req.body);
  }
  else if(req.body.nomUtilisateur == undefined & req.body.contenu != undefined){
    addUserFeedback("Anonyme", req.body.contenu);
    res.status(201);
    res.send(req.body);
  }

  // else{
  //   res.statusCode = 400;
  //   res.json({"error":"Bad body"});
  // }

});

app.get('/', function(req, res){
  res.send(undefined);
})

app.get('/get/userFeedback', function(req, res){
  var requete = 'SELECT * FROM feedback_utilisateurs'

  db.query(requete, function(err, result, fields){
    if(err) throw err;
    res.send(result);
  });

});

app.use(handleError);

app.listen(PORT, () => console.log("En attente sur le port " + PORT));
