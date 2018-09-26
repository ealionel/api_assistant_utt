// This file is an initialization file.

const { sequelize, model } = require('./index.js');
const jsonUE = require('./guideUE.json');

async function initListUE() {
  jsonUE.forEach(async (ue) => {
    model.ListUE.create(ue)
      .then(addedUE => console.log(`${addedUE.code} added.`))
      .catch(err => Promise.reject(err));
  });

  return Promise.resolve();
}

// Async function to initialize database models automatically
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
