const fetch = require('node-fetch');
const queryString = require('querystring');

/**
 * Fetches private user informations on etu API
 * @param {Object} Object
 * @param {Object} userTokens
 * @param {string} endpoint
 */
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

/**
 * Fetches user informations via login name
 * @param {Object} Object
 * @param {Object} userTokens
 * @param {string} endpoint
 */
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

/**
 * Fetches users informations on etu API, filtering is possible
 * @param {Object} Object
 * @param {Object} userTokens
 * @param {string} endpoint
 */
async function fetchUsersByFilter({
    userTokens,
    filterString,
    filter,
}) {
    try {
        // We choose to use in priority the filter already query stringified{
        const filterQueryString = filterString || querystring.stringify(filter);

        console.log(filterQueryString);

        let result = await fetch(`https://etu.utt.fr/api/public/users?${filterQueryString}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userTokens.access_token}`,
            },
        })  .then((user) => user.json());

        return result;
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

module.exports.userByLogin = fetchUserByLogin;
module.exports.usersByFilter = fetchUsersByFilter;
module.exports.privateUserInfo = fetchPrivateUserInfo;