const Sequelize = require('sequelize');

const sequelize = new Sequelize('assistant_utt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Declare the name of every models that are in path ./models
// to import them
const models = [
  'ListUE',
  'UsersFeedback',
];

module.exports.model = {};

// This is to avoid having to declare every models everytime we want to
// make an app interacting with our MySQL database.
models.forEach((modelName) => {
  module.exports.model[modelName] = sequelize.import(`${__dirname}/models/${modelName}`);
});

module.exports.sequelize = sequelize;

module.exports.sequelize.connectToDatabase = () => {
  sequelize.authenticate()
    .then(() => console.log('Connection to database established.'));
};
