
module.exports = (sequelize, DataTypes) => {
  const urgency = sequelize.define('urgency', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  urgency.associate = models => {
    urgency.hasMany(models.incident);
  };

  return urgency;
};
