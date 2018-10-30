const express = require('express');
const { model } = require('../database');
const authCheck = require('../middlewares/AuthCheck');
const fetchEtuUsers = require('../helpers/fetchEtuUsers');

const router = express.Router();

router.get('/', authCheck , async (req, res) => {
    try {
        const userTokens = res.locals.userTokens;

        const userInfo = await fetchEtuUsers({
            userTokens,
            endpoint: 'account',
        });

        res.send(`Salut, tu es bien ${userInfo.fullName} ?`);
    } catch (err) {
        console.log(err.message);
        res.json({ error: err.message })
    }
});

module.exports = router;