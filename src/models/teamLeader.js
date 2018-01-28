module.exports = (sequelize, DataTypes) => {
  const teamLeader = sequelize.define('teamLeader', {});

  teamLeader.associate = models => {
    teamLeader.belongsTo(models.user);
    teamLeader.belongsTo(models.team);
  };

  return teamLeader;
};
