
module.exports = (sequelize, DataTypes) => {
  const userTeam = sequelize.define('userTeam', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  userTeam.associate = models => {
    userTeam.belongsTo(models.user, { as: 'leader' });
    userTeam.belongsTo(models.user, { as: 'member' });
    userTeam.belongsTo(models.team, { as: 'leader' });
    userTeam.belongsTo(models.team, { as: 'member' })
  };

  return userTeam;
};
