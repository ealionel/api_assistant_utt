// WIll contain list of authenticated users and
// their respective refresh token.
const fetchEtu = require('../../helpers/fetchEtu');
const { etuAuth } = require('../../controllers/Auth');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('UsersTokens', {
        username: DataTypes.STRING,
        sender_id: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
        refreshTokenLastUpdate: DataTypes.DATE,
        access_token: DataTypes.STRING,
        accessTokenLastUpdate: DataTypes.DATE,
    });
    
    /**
     * Adds a new entry to the UsersTokens table.
     * @param  {Object} Object
     * @param  {string} Object.username
     * @param  {string} Object.sender_id
     * @param  {string} Object.refresh_token
     * @param  {string} Object.access_token
     */
    Model.addUser = async function ({ username, sender_id, refresh_token, access_token }) {
        try {
            const currentTime = new Date().toLocaleString();

            const newUserTokens = await Model.create({
                username,
                sender_id,
                refresh_token,
                access_token,
                refreshTokenLastUpdate: currentTime,
                accessTokenLastUpdate: currentTime,
            });
    
            console.log(`User added : ${newUserTokens.sender_id}`);

            return newUserTokens;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Checks if entry with same sender_id does not already exist.
     * If so, it updates the old one, if not it adds a new entry.
     * @param  {Object} Object
     * @param  {string} Object.username
     * @param  {string} Object.sender_id
     * @param  {string} Object.refresh_token
     * @param  {string} Object.access_token
     */
    Model.newUser = async function ({ username, sender_id, refresh_token, access_token }) {
        try {
            let userTokens = await Model.getUser(sender_id);
            if (userTokens) {
                await userTokens.updateUserTokens({
                    access_token,
                    refresh_token,
                });
                console.log(`${sender_id} already exists, updating old one.`)
            } else {
                userTokens = await Model.addUser({
                    username,
                    sender_id,
                    refresh_token,
                    access_token,
                });
            }

            return userTokens;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Returns instance of UsersTokens by sender_id
     * @param  {string} sender_id
     */
    Model.getUser = async function(sender_id) {
        try {
            return await Model.findAll({
                limit: 1,
                where: {
                    sender_id,
                },
                order: [['createdAt', 'DESC']],
            }).then((userToken) => userToken[0]);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    /**
     * Returns a boolean if sender_id is already in database.
     * @param  {string} sender_id
     */
    Model.hasSenderId = async function(sender_id) {
        try {
            return await Model.getUser(sender_id)
                .then(userToken => !!userToken);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    /**
     * Updates a UserToken model object
     * @param  {Object} UserTokens
     * @param  {string} UserTokens.access_token
     * @param  {string} UserTokens.refresh_token
     */
    Model.prototype.updateUserTokens = async function({ refresh_token, access_token }) {
        this.refresh_token = refresh_token;
        this.access_token = access_token;

        const currentTime = new Date().toLocaleString();
        this.refreshTokenLastUpdate = currentTime;
        this.accessTokenLastUpdate = currentTime;

        await this.save();

        return this;
    }

    /**
     * Fetches this UserTokens private information, depending on the parameter
     * @param  {string} endpoint
     */
    Model.prototype.getPrivateEtuUserInfo = async function(endpoint) {
        try {
            console.log(`getUserInfo called for ${this.sender_id}`);
            
            if (this.hasRefreshTokenExpired() || this.hasAccessTokenExpired()) {
                await this.refresh();
            }
            
            return fetchEtu.privateUserInfo({
                userTokens: this,
                endpoint,
            });
        } catch (err) {
            console.log(`Failed fetching ${this.sender_id} user informations`);
            console.log(err);
            throw err;
        }
    }

    /**
     * Returns if refresh_token has expired or not (1 month).
     * (Doesn't send any HTTP request, just checks in database last refresh time)
     * @return {boolean}
     */
    Model.prototype.hasRefreshTokenExpired = function() {
        const timeDifference = (new Date().getTime() - (new Date(this.refreshTokenLastUpdate)).getTime()) / 1000;
        if (timeDifference > 2592000) {
            console.log(`Refresh token of ${sender_id} expired since ${timeDifference}s`);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns if access_token has expired or not (1 hour).
     * (Doesn't send any HTTP request, just checks in database last refresh time)
     * @return {boolean}
     */
    Model.prototype.hasAccessTokenExpired = function() {
        const timeDifference = ((new Date()).getTime() - new Date(this.refreshTokenLastUpdate).getTime()) / 1000;
        if (timeDifference > 3600) {
            console.log(`Access token of ${this.sender_id} expired since ${timeDifference}s`);
            return true;
        } else {
            return false;
        }
    }

    Model.prototype.refresh = async function() {
        try {
            console.log(`Token refresh called for ${this.sender_id}...`);
            const token = etuAuth.createToken(this.access_token, this.refresh_token);
            await token.refresh()
            .then((user) => {
                this.updateUserTokens({
                    refresh_token: user.data.refresh_token,
                    access_token: user.data.access_token,
                });
            });
            
            console.log(`Token refresh for ${this.sender_id} successful !`)
            return this;
        } catch (err) {
            console.log(`Failed refreshing tokens for ${this.sender_id} : ${err}`);
            console.log(err);
            throw err;
        }
    }

    return Model;
};