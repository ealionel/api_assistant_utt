const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    // logging: false,
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
  'AuthenticatedUsers',
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
