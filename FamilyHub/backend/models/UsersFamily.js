module.exports = (sequelize, DataTypes) => {
  const UsersFamily = sequelize.define(
    'UsersFamily',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      familyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Family',
          key: 'id',
        },
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );
  return UsersFamily;
};
