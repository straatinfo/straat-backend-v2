
module.exports = (sequelize, DataTypes) => {
  const subCategory = sequelize.define('subCategory', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  subCategory.associate = models => {
    subCategory.belongsTo(models.mainCategory); // defaults to 1 = general
    subCategory.hasMany(models.incident);
  };

  return subCategory;
};
