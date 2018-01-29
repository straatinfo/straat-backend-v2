
module.exports = (sequelize, DataTypes) => {
  const mainCategory = sequelize.define('mainCategory', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  mainCategory.associate = models => {
    mainCategory.belongsTo(models.user, { as: 'host' });
    mainCategory.belongsTo(models.reportType);
    mainCategory.hasMany(models.report);
    mainCategory.hasMany(models.subCategory, { onDelete: 'CASCADE'});
  };

  return mainCategory;
};
