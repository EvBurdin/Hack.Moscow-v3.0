module.exports = (sequelize, DataTypes) => {
  const Spend = sequelize.define(
    'Spend',
    {
      comment: {
        type: DataTypes.STRING(2000),
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: [''] },
      },
    },
  );
  Spend.associate = (models) => {
    Spend.belongsTo(models.Family);
    Spend.belongsTo(models.User);
    Spend.belongsTo(models.SpendCategory, { as: 'category' });
  };
  return Spend;
};
