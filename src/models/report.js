module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
    generatedReportId: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    location: { type: DataTypes.STRING }, // should use the google format
    lat: { type: DataTypes.DOUBLE }, // latitude
    long: { type: DataTypes.DOUBLE }, // longtitude
    note: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'Unresolved' },
    isVehicleInvolved: { type: DataTypes.BOOLEAN }, // for category B
    isPeopleInvolved: { type: DataTypes.BOOLEAN }, // for category B
    vehicleInvolvedDescription: { type: DataTypes.STRING }, // for category B
    peopleInvolvedCount: { type: DataTypes.INTEGER } // for category B
  });

  // location format
  // House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country

  report.associate = models => {
    report.belongsTo(models.user, { as: 'host' });
    report.belongsTo(models.user, { as: 'reporter' });
    report.belongsTo(models.reportType);
    report.belongsTo(models.mainCategory);
    report.belongsTo(models.subCategory);
    report.belongsTo(models.priority);
  };

  return report;
};
