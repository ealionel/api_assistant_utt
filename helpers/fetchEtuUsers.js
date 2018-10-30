const fetch = require('node-fetch');

async function fetchPrivateUserInfo({
    userTokens,
    endpoint = 'account',
}) {
    try {

        if (!['account', 'schedule', 'organizations'].includes(endpoint)) {
            throw new Error(`Endpoint '${endpoint}' does not exist.`)
        }
        
    const result = await fetch(`https://etu.utt.fr/api/private/user/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userTokens.access_token}`
        }
    }).then((user) => user.json())
    .then((user) => user.data);

    console.log(result);
    return result;
    
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

module.exports = fetchPrivateUserInfo;