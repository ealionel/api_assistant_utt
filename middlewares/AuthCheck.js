const { model } = require('../database');

/**
 * This middleware checks if the sender id is present
 * whether in header ('sender-id') or in query string (sender_id)
 */
const authenticationCheck = async (req, res, next) => {

    try { 
        const senderId = req.query.sender_id || req.get('sender-id');

        if (!senderId) {
            return res.status(401).json({ error: 'sender_id is missing'});
        }
    
        const userTokens = await model.UsersTokens.getUser(senderId);
    
        if (userTokens) {

            // If accesToken or refreshToken has expired, we refresh them 
            if (userTokens.hasRefreshTokenExpired() || userTokens.hasAccessTokenExpired()) {
                await userTokens.refresh();
            }

            res.locals.userTokens = userTokens;

            return next();
        } else {
            console.log(`${senderId} is not authenticated.`)
            return res.status(401).json({ error : `'${senderId}' is not authenticated.` });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error : 'An error occured when checking authentication.' });
    }
};

module.exports = authenticationCheck;