const express = require('express');
const { model } = require('../database');
const authCheck = require('../middlewares/AuthCheck');
const fetchEtu = require('../helpers/fetchEtu');

const router = express.Router();

router.get('/private/:endpoint', authCheck , async (req, res) => {
    try {
        const userTokens = res.locals.userTokens;

        const userInfo = await userTokens.getUserInfo(req.params.endpoint);

        res.json(userInfo);
    } catch (err) {
        console.log(err.message);
        res.json({ error: 'An error occured when fetching private user information.' })
    }
});



module.exports = router;