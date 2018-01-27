module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    accessLevel: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  // address format
  // House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country

  role.associate = models => {
    role.hasMany(models.user);
  };

  return role;
};
