module.exports = (sequelize, DataTypes) => (
  sequelize.define('ListUE', {
    code: DataTypes.STRING,
    titre: DataTypes.STRING,
    objectif: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('objectif'));
      },
    },
    programme: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('programme'));
      },
    },
    commentaires: DataTypes.STRING,
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
