// CE SCRIPT PERMET DE LANCER L'API QUI PERMET DE RÉCUPERER TOUS LE CONTENU DES QUESTIONS


const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');

const app = express();

// process.env.PORT c'est pour HEROKU quand il déploie le code
const PORT = process.env.PORT || 8080;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assistant_utt',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connexion à la base donnée OK');
});

app.use(bodyParser.json());

function echoRequete(req, res, next) {
  const reqTotal = [req.headers].concat([req.body]);
  res.json(reqTotal);
  console.log(reqTotal);

  next();
}

function addUserFeedback(nom, contenu) {
  const requete = `INSERT INTO feedback_utilisateurs (nom_utilisateur, contenu) VALUES ('${mysql.escape(nom)}', '${mysql.escape(contenu)}')`;
  db.query(requete, (err) => {
    if (err) throw err;
    console.log('Ajout de %s : %s', nom, contenu);
  });
}

function handleError(err, req, res, next) {
  if (err instanceof SyntaxError) {
    console.log(err);
    res.send(err);
  }

  next();
}


app.post('/echo', echoRequete, () => {});

app.post('/add/userFeedback', (req, res) => {
  if (req.body.nomUtilisateur !== undefined && req.body.contenu !== undefined) {
    addUserFeedback(req.body.nomUtilisateur, req.body.contenu);

    res.status(201);
    res.send(req.body);
  } else if (req.body.nomUtilisateur === undefined && req.body.contenu !== undefined) {
    addUserFeedback('Anonyme', req.body.contenu);
    res.status(201);
    res.send(req.body);
  }
});

app.get('/', (req, res) => {
  res.send(undefined);
});


app.get('/get/userFeedback', (req, res) => {
  const requete = 'SELECT * FROM feedback_utilisateurs';

  db.query(requete, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/get/UE', (req, res) => {
  let requete = 'SELECT * FROM info_ue';

  if (req.query.code != null) {
    requete = `${requete} WHERE code=${mysql.escape(req.query.code)}`;
  }

  console.log(requete);

  db.query(requete, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send({ error: `'${req.query.code}' does not exist in the UE database.` });
    }
  });
});


app.use(handleError);

app.listen(PORT, () => console.log('Listening at port %d', PORT));
