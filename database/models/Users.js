// WIll contain list of authenticated users and
// their respective refresh token.

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Users', {
        username: DataTypes.STRING,
        userId: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        refreshTokenLastUpdate: DataTypes.DATE,
        accessToken: DataTypes.STRING,
        accessTokenlastUpdate: DataTypes.DATE,
    });
    
    Model.addUser = async function ({ username, userId, refreshToken, accessToken }) {
        try {
            const newUser = await Model.create({
                username,
                userId,
                refreshToken,
                accessToken,
                refreshToken,
                accessTokenlastUpdate: new Date().toLocaleString(),
                refreshTokenlastUpdate: new Date().toLocaleString(),
            });
    
            console.log(`User added : ${newUser}`);
    
        } catch (err) {
            console.log('An error occured');
            throw new Error(err);
        }
    }

    return Model;
};