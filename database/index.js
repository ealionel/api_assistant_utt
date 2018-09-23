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

const models = [
  'ListUE',
  'UsersFeedback',
];

module.exports.model = {};

models.forEach((modelName) => {
  module.exports.model[modelName] = sequelize.import(`${__dirname}/models/${modelName}`);
});

module.exports.sequelize = sequelize;

// sequelize.sync({ force: true }).then(() => {
//   ListUE.create({
//     code: 'LO14',
//   });
// });
