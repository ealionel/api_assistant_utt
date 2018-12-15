const express = require('express');
const dialogflow = require('dialogflow');

const router = express.Router();

const PORT = process.env.PORT || 3001;

/**
 * EXPORT CREDENTIALS WITH :
 * export GOOGLE_APPLICATION_CREDENTIALS="./<crendentials>.json"
 */

const projectId = 'assistant-utt-mini-c5680'; //https://dialogflow.com/docs/agents#settings

/**
 * TO DO : Manage sessions ID with sessions or cookie
 */
const sessionId = 'quickstart-session-id';
const languageCode = 'fr';

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

router.get('/detectIntent', (req, res) => {
    console.log(req.query);

    const query = req.query.textRequest;

    const chatbotRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(chatbotRequest)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0]; //.queryResult;
            console.log(JSON.stringify(result, null, 2));

            res.send(result);
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send({
                error: 'Error'
            })
        });

});

module.exports = router;