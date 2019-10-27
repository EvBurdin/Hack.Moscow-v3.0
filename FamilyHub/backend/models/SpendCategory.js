module.exports = (sequelize, DataTypes) => {
  const SpendCategory = sequelize.define(
    'SpendCategory',
    {
      label: {
        type: DataTypes.STRING(2000),
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );
  SpendCategory.associate = (models) => {};
  return SpendCategory;
};
