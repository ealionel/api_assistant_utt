const express = require('express');
const dialogflow = require('dialogflow');

const router = express.Router();


const PORT = process.env.PORT || 3001;

/**
 * EXPORT CREDENTIALS WITH
 * export GOOGLE_APPLICATION_CREDENTIALS="./assistant-UTT.json"
 *
 */

const projectId = 'assistant-utt-mini-c5680'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'fr';

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

router.get('/detectIntent', (req, res) => {

//   res.set({
//     'Access-Control-Allow-Origin': 'http://localhost:3000',
//     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//   });

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
      const result = responses[0];//.queryResult;
      console.log(JSON.stringify(result, null, 2));
      // console.log(`  Query: ${result.queryText}`);
      // console.log(`  Response: ${result.fulfillmentText}`);
      // if (result.intent) {
      //   console.log(`  Intent: ${result.intent.displayName}`);
      // } else {
      //   console.log(`  No intent matched.`);
      // }
      //
      res.send(result);
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(500).send({ error: 'Error' })
    });

});

module.exports = router;