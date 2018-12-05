
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// This is a wrapper from express library to avoid creating
// more than one connection to the database. (See nodejs doc on caching)
app.set('database', require('./database'));

const { sequelize } = app.get('database');


app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./controllers'));


app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  sequelize.connectToDatabase();
});