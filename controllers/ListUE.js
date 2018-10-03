const express = require('express');
const { model, sequelize } = require('../database');
const router = express.Router();

router.get('/get', (req, res) => {
  model.ListUE.findAll({
    attributes: [
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
    ],
    where: {
      code: req.query.code,
    },
  }).then((result) => {
    res.json(result);
  });
});

module.exports = router;
