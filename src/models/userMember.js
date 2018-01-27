module.exports = (sequelize, DataTypes) => {
  const userMember = sequelize.define('userMember', {});
  
  userMember.associate = models => {
    userMember.belongsTo(models.user);
    userMember.belongsTo(models.team);
  };

  return userMember;
};
