const express = require('express');
const { model } = require('../database');
const authCheck = require('../middlewares/AuthCheck');
const fetchEtu = require('../helpers/fetchEtu');

const router = express.Router();

router.get('/private/:endpoint', authCheck , async (req, res) => {
    try {
        const userTokens = res.locals.userTokens;

        const userInfo = await userTokens.getPrivateEtuUserInfo(req.params.endpoint);

        if (userInfo.error) {
            return res.status(401).json(userInfo);
        }

        res.json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured when fetching private user information.' })
    }
});

router.get('/:login', authCheck, async (req, res) => {
    try {
        const userTokens = res.locals.userTokens;
        const userInfo = await fetchEtu.userByLogin({
            userTokens,
            login: req.params.login,
        });

        res.json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured when fetching user information.' })
    }
});

module.exports = router;