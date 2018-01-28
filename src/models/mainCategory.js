
module.exports = (sequelize, DataTypes) => {
  const mainCategory = sequelize.define('mainCategory', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  mainCategory.associate = models => {
    mainCategory.belongsTo(models.user, { as: 'host' });
    mainCategory.belongsTo(models.incidentType);
    mainCategory.hasMany(models.incident);
    mainCategory.hasMany(models.subCategory, { onDelete: 'CASCADE'});
  };

  return mainCategory;
};
