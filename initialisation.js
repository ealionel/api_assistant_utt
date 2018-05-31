//CE SCRIPT PERMETTRA D'INITIALISER LA BASE DE DONNÉE SI JAMAIS ELLE NE L'AS PAS ÉTÉ FAITE ENCORE

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assistant_utt'
});

connection.connect(function(err){
  if (err) throw err;
  console.log('Connexion établie');

  connection.query("CREATE DATABASE IF NOT EXISTS assistant_utt", function(err,result){
    if (err) throw err;
    console.log("Création de la BDD assistant_mini");
  });

  connection.query("CREATE TABLE IF NOT EXISTS questions_basiques (\
    id INT NOT NULL AUTO_INCREMENT, \
    PRIMARY KEY(id),\
    question TEXT,\
    reponse TEXT)", function(err, result){
    if (err) throw err;
    console.log("Création de table questions");
  });

  //TABLE QUI CONTIENT LES MESSAGES QUE LES UTILISATEURS NOUS ENVOIENT VIA L'INTENT envoyer.message
  connection.query("CREATE TABLE IF NOT EXISTS messages_utilisateur (\
    id INT NOT NULL AUTO_INCREMENT, \
    PRIMARY KEY(id), \
    utilisateur TEXT, \
    message TEXT)", function(err, result){
    if (err) throw err;
    console.log("Création de table messages_utilisateur");
  });


});

console.log("Fin");
process.exit();
