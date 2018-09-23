const { sequelize, model } = require('./index.js');
const jsonUE = require('./guideUE.json');
// const Sequelize = require('sequelize');

async function initListUE() {
  jsonUE.forEach(async (ue) => {
    await model.ListUE.create(ue)
      .then(addedUE => console.log(`${addedUE.code} added.`));
  });

  return Promise.resolve();
}

async function init() {
  await sequelize.authenticate();
  console.log('Connection established.');

  console.log('Syncing models to database.');
  try {
    await sequelize.sync({ force: true });
  } catch (err) {
    console.log(`Error syncing models : ${err}`);
  }

  try {
    await initListUE();
  } catch (err) {
    console.log(`Error initializing ListUE : ${err}`);
  }
}

init();
