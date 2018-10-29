const express = require('express');
const { model } = require('../database');
const router = express.Router();
const ClientOAuth2 = require('client-oauth2');
const url = require('url');

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
    const userId = req.query.id? req.query.id:'xyz';

    const authUri = new url.URL(etuAuth.code.getUri({
        state: userId,
    }));

    // We have to add a 'scopes' queryString because etu
    // accepts 'scopes' instead of 'scope'
    authUri.searchParams.set('scopes',  authUri.searchParams.get('scope'));

    console.log(`Authentication called with id '${userId}'`),

    res.redirect(authUri.toString());
});

router.get('/debug', (req, res) => {
    console.log(model.ListUE.trucTest);
    res.send(model.ListUE.trucTest);
});

router.get('/redirect', async (req, res, next) => {
    if (req.query.error) {
        console.log(req.query.error);
        return res.send('Authentification annulée.');
    }
    
    try {
        const userToken = await etuAuth.code.getToken(req.originalUrl)
            .then(user => user.data);
        
        await model.Users.addUser({
            username: 'Unknown',
            userId: req.query.state,
            refreshToken: userToken.refresh_token,
            accessToken: userToken.access_token,
        });

        console.log('User authenticated');
        // res.send('Authentification réussie');
        res.send(userToken);
    } catch (err) {
        console.log(`Authentication failed : ${err}`);
        res.send('Authentification échouée').status(401);
    }
});


module.exports = router;