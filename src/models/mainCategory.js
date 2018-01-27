
module.exports = (sequelize, DataTypes) => {
  const mainCategory = sequelize.define('mainCategory', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  mainCategory.associate = models => {
    mainCategory.belongsTo(models.user, { as: 'owner' });
    mainCategory.hasMany(models.subCategory);
  };

  return mainCategory;
};
