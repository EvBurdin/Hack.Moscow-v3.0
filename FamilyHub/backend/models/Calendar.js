module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define(
    'Calendar',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateStart: {
        type: DataTypes.DATE,
      },
      dateEnd: {
        type: DataTypes.DATE,
      },
      periodicId: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: [''] },
      },
    },
  );
  Calendar.associate = (models) => {
    Calendar.belongsTo(models.Family);
    Calendar.belongsTo(models.User, { foreignKey: 'author' });
  };
  return Calendar;
};
