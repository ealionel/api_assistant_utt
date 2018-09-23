module.exports = (sequelize, DataTypes) => (
  sequelize.define('ListUE', {
    code: DataTypes.STRING,
    titre: DataTypes.STRING,
    objectif: DataTypes.JSON,
    programme: DataTypes.JSON,
    categorie: DataTypes.STRING,
    credits: DataTypes.TINYINT,
    semestre: DataTypes.STRING,
    antecedent: DataTypes.STRING,
    langues: DataTypes.STRING,
    diplome: DataTypes.STRING,
    Cvolume: DataTypes.SMALLINT,
    TDvolume: DataTypes.SMALLINT,
    TPvolume: DataTypes.SMALLINT,
    THEvolume: DataTypes.SMALLINT,
  }, {
    freezeTableName: true,
  })
);
