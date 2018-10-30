const { model } = require('../database');

const authenticationCheck = async (req, res, next) => {

    try {
        const sender_id = req.query.sender_id;
    
        if (!sender_id) {
            throw new Error ('No sender_id query string in url');
        }
    
        const userTokens = await model.UsersTokens.findAll({
            limit: 1,
            where: {
                sender_id: sender_id,
            },
            order: [['createdAt', 'DESC']],
        }).then((result) => {    
            return result[0];
        });

    
        if (userTokens) {
            res.locals.userTokens = userTokens;
            return next();
        } else {
            throw new Error(`senderId '${sender_id}' does not match any already authenticated users`);
        }

    } catch (err) {
        console.log(err.message);
        res.json({ error : err.message });
    }
};

module.exports = authenticationCheck;