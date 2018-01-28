module.exports = (sequelize, DataTypes) => {
  const incidentType = sequelize.define('incidentType', {
    code: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  incidentType.associate = models => {
    incidentType.hasMany(models.incident);
    incidentType.hasMany(models.mainCategory);
  };

  return incidentType;
};
