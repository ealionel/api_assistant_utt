// WIll contain list of authenticated users and
// their respective refresh token.

module.exports = (sequelize, DataTypes) => (
    sequelize.define('Users', {
        name: DataTypes.STRING,
        userFacebookId: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        refreshTokenLastUpdate: DataTypes.STRING,
        accessToken: DataTypes.STRING,
        lastRefresh: DataTypes.DATE,
    })
);