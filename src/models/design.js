module.exports = (sequelize, DataTypes) => {
  const design = sequelize.define('design', {
    designName: { type: DataTypes.STRING, allowNull: false },
    designOne: DataTypes.STRING,
    designTwo: DataTypes.STRING,
    designThree: DataTypes.STRING,
    designFour: DataTypes.STRING
  });

  design.associate = models => {
    design.belongsTo(models.user, { as: 'host'});
  };

  return design;
};
