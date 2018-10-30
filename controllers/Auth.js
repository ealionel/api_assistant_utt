const express = require('express');
const { model } = require('../database');
const router = express.Router();
const ClientOAuth2 = require('client-oauth2');
const url = require('url');
const fetchEtuUsers = require('../helpers/fetchEtuUsers');

// Loading app credentials from environment file vars

const etuAuth = new ClientOAuth2({
    clientId: process.env.ETU_CLIENT_ID,
    clientSecret: process.env.ETU_CLIENT_SECRET,
    accessTokenUri: 'https://etu.utt.fr/api/oauth/token',
    authorizationUri: 'https://etu.utt.fr/api/oauth/authorize',
    redirectUri: 'localhost:8080/auth/redirect',
    scopes: ['public', 'private_user_account', 'private_user_schedule', 'private_user_organizations'],  
})

// Endpoint that redirects user towards
// etu.utt.fr's authentication page.
router.get('/', (req, res) => {
    // This variable is would eventually be their Facebook id
    const senderId = req.query.sender_id? req.query.sender_id:'xyz';

    const authUri = new url.URL(etuAuth.code.getUri({
        state: senderId,
    }));

    // We have to add a 'scopes' queryString because etu
    // accepts 'scopes' instead of 'scope'
    authUri.searchParams.set('scopes',  authUri.searchParams.get('scope'));

    console.log(`Authentication called with id '${senderId}'`),

    res.redirect(authUri.toString());
});

// Callback url after user has given permission to app or not
// The tokens are then stored in the database
router.get('/redirect', async (req, res, next) => {
    if (req.query.error) {
        console.log(req.query.error);
        return res.send('Authentification annulée.');
    }
    
    try {
        // This is etu's user tokens object
        const rawUserTokens = await etuAuth.code.getToken(req.originalUrl)
            .then(user => user.data);
        
        // This is our model's user tokens object
        const userTokens = await model.AuthenticatedUsers.addUser({
            username: 'Unknown',
            sender_id: req.query.state,
            refresh_token: rawUserTokens.refresh_token,
            access_token: rawUserTokens.access_token,
        });

        const user = await fetchEtuUsers({
            userTokens,
            endpoint: 'account',
        });

        console.log(`User ${user.login} authenticated`);
        res.send(`Bonjour ${user.fullName} ! Vous êtes maintenant authentifiés.`);
    } catch (err) {
        console.log(`Authentication failed : ${err}`);
        res.send('Authentification échouée').status(401);
    }
});

module.exports = router;