
module.exports = (sequelize, DataTypes) => {
  const urgency = sequelize.define('urgency', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  urgency.associate = models => {
    urgency.hasMany(models.report);
  };

  return urgency;
};
