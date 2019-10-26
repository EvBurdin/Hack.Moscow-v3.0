module.exports = (sequelize, DataTypes) => {
  const SpendCategory = sequelize.define(
    'SpendCategory',
    {
      name: {
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
