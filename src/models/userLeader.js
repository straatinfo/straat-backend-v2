module.exports = (sequelize, DataTypes) => {
  const userLeader = sequelize.define('userLeader', {});
  
  userLeader.associate = models => {
    userLeader.belongsTo(models.user);
    userLeader.belongsTo(models.team);
  };

  return userLeader;
};
