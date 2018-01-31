
module.exports = (sequelize, DataTypes) => {
  const priority = sequelize.define('priority', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  priority.associate = models => {
    priority.hasMany(models.report);
  };

  return priority;
};
