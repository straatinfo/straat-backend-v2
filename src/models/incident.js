module.exports = (sequelize, DataTypes) => {
  const incident = sequelize.define('incident', {
    incidentReportId: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    location: { type: DataTypes.STRING }, // should use the google format
    lat: { type: DataTypes.DOUBLE }, // latitude
    long: { type: DataTypes.DOUBLE }, // longtitude
    note: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'Unresolved' },
    isVehicleInvolved: { type: DataTypes.BOOLEAN },
    isPeopleInvolved: { type: DataTypes.BOOLEAN },
    vehicleInvolvedDescription: { type: DataTypes.STRING },
    peopleInvolvedCount: { type: DataTypes.INTEGER }
  });

  // location format
  // House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country

  incident.associate = models => {
    incident.belongsTo(models.user, { as: 'host' });
    incident.belongsTo(models.user, { as: 'reporter' });
    incident.belongsTo(models.incidentType);
    incident.belongsTo(models.mainCategory);
    incident.belongsTo(models.subCategory);
    incident.belongsTo(models.urgency);
  };

  return incident;
};
