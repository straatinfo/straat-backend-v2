module.exports = (sequelize, DataTypes) => {
  const teamMember = sequelize.define('teamMember', {});

  teamMember.associate = models => {
    teamMember.belongsTo(models.user);
    teamMember.belongsTo(models.team);
  };

  return teamMember;
};
