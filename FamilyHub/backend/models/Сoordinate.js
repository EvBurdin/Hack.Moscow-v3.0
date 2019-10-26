module.exports = (sequelize, DataTypes) => {
  const Сoordinate = sequelize.define(
    'Coordinate',
    {
      accuracy: {
        type: DataTypes.DECIMAL,
      },
      altitude: {
        type: DataTypes.DECIMAL,
      },
      heading: {
        type: DataTypes.DECIMAL,
      },
      latitude: {
        type: DataTypes.DECIMAL,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      speed: {
        type: DataTypes.DECIMAL(10, 2),
      },
      location: {
        type: DataTypes.STRING,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['updatedAt'] },
      },
    },
  );
  return Сoordinate;
};
