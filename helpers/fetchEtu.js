const fetch = require('node-fetch');

async function fetchPrivateUserInfo({
    userTokens,
    endpoint = 'account',
}) {
    try {
        if (!['account', 'schedule', 'organizations'].includes(endpoint)) {
            throw new Error(`Endpoint '${endpoint}' does not exist.`)
        }
        
        let result = await fetch(`https://etu.utt.fr/api/private/user/${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userTokens.access_token}`,
            },
        })  .then((user) => user.json());

        if (!result.error) {
            result = result.data;
        }

        return result;
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

async function fetchUserByLogin({
    userTokens,
    login = '',
}) {
    try {
        let result = await fetch(`https://etu.utt.fr/api/public/users/${login}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userTokens.access_token}`,
            },
        })  .then((user) => user.json());

        // In case server is down or tokens have expired.
        if (!result.error) {
            result = result.data;
        }

        return result;
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

module.exports.userByLogin = fetchUserByLogin;
module.exports.privateUserInfo = fetchPrivateUserInfo;