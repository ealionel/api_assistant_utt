const express = require('express');
const { model, sequelize } = require('../database');
const router = express.Router();

const middlewares = require('../middlewares/ListUE');

const ueFieldList = [
  'id',
  'code',
  'titre',
  'categorie',
  'diplome',
  'Cvolume',
  'TDvolume',
  'TPvolume',
  'THEvolume',
  'commentaires',
  'credits',
  'langues',
  'objectif',
  'programme',
  'semestre',
];

router.get('/:codeUE', (req, res, next) => {
  model.ListUE.findOne({
    attributes: ueFieldList,
    where: {
      code: req.params.codeUE,
    },
  }).then((result) => {
    console.log(result);
    res.locals.queryResult = result;

    next();
  });
}, middlewares.validateResult);

router.get('/', (req, res, next) => {
  const filter = {};

  ueFieldList.forEach((field) => {
    if (req.query[field]) {
      filter[field] = req.query[field];
    }
  });

  model.ListUE.findAll({
    attributes: ueFieldList,
    where: filter,
  }).then((result) => {
    res.locals.queryResultArray = result;

    next();
  });
}, middlewares.validateResult);


module.exports = router;
