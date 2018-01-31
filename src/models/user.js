const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    hostName: { type: DataTypes.STRING }, // for hosts
    fname: { type: DataTypes.STRING },// for users
    email: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING },
    lname: { type: DataTypes.STRING},
    gender: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    houseNumber: { type: DataTypes.STRING },
    streetName: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zip: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    nickName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    long: { type: DataTypes.DOUBLE },
    lat: { type: DataTypes.DOUBLE },
    isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  // address format
  // House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country

  user.associate = models => {
    user.belongsTo(models.role);
    user.hasMany(models.report, { as: 'reporter' });
    user.hasMany(models.report, { as: 'host' });
    user.hasMany(models.teamLeader);
    user.hasMany(models.teamMember);
    user.hasMany(models.design);
  };

  user.beforeSave(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });
  return user;
};
