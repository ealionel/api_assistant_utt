
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

// This is a wrapper from express library to avoid creating
// more than one connection to the database. (See nodejs doc on caching)
app.set('database', require('./database'));

const { model, sequelize } = app.get('database');

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  sequelize.connectToDatabase();
});
