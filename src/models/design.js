module.exports = (sequelize, DataTypes) => {
  const design = sequelize.define('design', {
    buttonBGC: { type: DataTypes.STRING },
    buttonTC: { type: DataTypes.STRING },
    pageBGC: { type: DataTypes.STRING },
    pageTC: { type: DataTypes.STRING },
    headerBGC: { type: DataTypes.STRING },
    headerTC: { type: DataTypes.STRING }
  });

  design.associate = models => {
    design.belongsTo(models.user, { as: 'host'});
  };

  return design;
};
