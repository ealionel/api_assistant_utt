const express = require('express');
const { model, sequelize } = require('../database');
const router = express.Router();

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

/**
* ENDPOINT ----> /api/ue/:code
* Sends information about the specified UE
* If it does not exist, it returns an object with an error field.
*/
router.get('/:codeUE', (req, res) => {
    model.ListUE.findOne({
        attributes: ueFieldList,
        where: {
            code: req.params.codeUE,
        },
    }).then((result) => {
        console.log(result);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send({ error: 'No results' });
        }
    });
});


/**
* ENDPOINT ----> /api/ue/
*/
router.get('/', (req, res) => {
    const filter = {};
    // This is to filter UE by their fields
    ueFieldList.forEach((field) => {
        if (req.query[field]) {
            filter[field] = req.query[field];
        }
    });
    
    model.ListUE.findAll({
        attributes: ueFieldList,
        where: filter,
    }).then((result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send({ error: 'No results' });
        }
    });
});


module.exports = router;
