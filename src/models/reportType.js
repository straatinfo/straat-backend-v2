module.exports = (sequelize, DataTypes) => {
  const reportType = sequelize.define('reportType', {
    code: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  reportType.associate = models => {
    reportType.hasMany(models.report);
    reportType.hasMany(models.mainCategory);
  };

  return reportType;
};
