module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  team.associate = models => {
    team.hasMany(models.userMember);
    team.hasMany(models.userLeader);
  };

  return team;
};
