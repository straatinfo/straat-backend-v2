module.exports = (sequelize, DataTypes) => {
  const subscription = sequelize.define('subscription', {
    code: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    subscriptionLength: { type: DataTypes.INTEGER }
  });

  subscription.associate = models => {
    subscription.belongsTo(models.user);
  };

  return subscription;
};
