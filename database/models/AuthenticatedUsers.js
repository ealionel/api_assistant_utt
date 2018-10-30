// WIll contain list of authenticated users and
// their respective refresh token.

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('AuthenticatedUsers', {
        username: DataTypes.STRING,
        sender_id: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
        refreshTokenLastUpdate: DataTypes.DATE,
        access_token: DataTypes.STRING,
        accessTokenlastUpdate: DataTypes.DATE,
    });
    
    Model.addUser = async function ({ username, sender_id, refresh_token, access_token }) {
        try {
            const currentTime = new Date().toLocaleString();

            const userToken = await Model.create({
                username,
                sender_id,
                refresh_token,
                access_token,
                refreshTokenlastUpdate: currentTime,
                accessTokenlastUpdate: currentTime,
            });
    
            console.log(`User added : ${userToken.sender_id}`);

            return userToken;
        } catch (err) {
            console.log('An error occured');
            throw new Error(err);
        }
    }

    return Model;
};