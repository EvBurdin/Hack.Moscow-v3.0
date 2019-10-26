module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: [''] },
      },
    },
  );
  Location.associate = (models) => {
    Location.belongsTo(models.Family);
    Location.belongsTo(models.User);
  };
  return Location;
};
