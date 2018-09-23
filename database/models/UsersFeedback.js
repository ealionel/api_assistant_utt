module.exports = (sequelize, DataTypes) => (
  sequelize.define('UsersFeedback', {
    username: {
      type: DataTypes.STRING,
      defaultValue: 'Anonymous',
    },
    message: DataTypes.STRING,
  }, {
    freezeTableName: true,
  })
);
