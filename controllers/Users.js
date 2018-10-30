const express = require('express');
const { model } = require('../database');
const authCheck = require('../middlewares/AuthCheck');
const fetchEtu = require('../helpers/fetchEtu');

const router = express.Router();

/**
 * ENDPOINT ----> /api/private/:endpoint
 * Fetch user private information. Information depends on :endpoint
 * Must be either 'account', 'organizations' or 'schedule'
 * 
 * Sender ID must be specified via query string (sender_id=)
 * or via 'Sender-Id' HTTP Header
 */
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

/**
 * ENDPOINT ----> /api/users/:login
 * Fetch user by login.
 * 
 * Sender ID must be specified via query string (sender_id=)
 * or via 'Sender-Id' HTTP Header
 */
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
        res.status(500).json({ error: 'An error occured when fetching user information.' });
    }
});

/**
 * ENDPOINT ----> /api/users?[filters]
 * Fetch list of users.
 * List of users can be filtered via these following query string :
 * firstname, lastname, name, branch, level, speciality,
 * is_student (bool), bde_member, student_id, multifield
 * 
 * Sender ID must be specified via query string (sender_id=)
 * or via 'Sender-Id' HTTP Header
 */
router.get('/', authCheck, async (req, res) => {
    try {
        console.log(req.originalUrl);
        // This is to parse raw query string
        const queryIndex = req.originalUrl.indexOf('?');
        const queryString = (queryIndex >= 0)? req.originalUrl.slice(queryIndex + 1):'';

        const userTokens = res.locals.userTokens;

        const usersInfo = await fetchEtu.usersByFilter({
            userTokens,
            filterString: queryString,
        });
        
        res.send(usersInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error : 'An error occured when fetching list of users informations.'});
    }
})

module.exports = router;