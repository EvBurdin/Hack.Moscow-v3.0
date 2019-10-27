module.exports = (sequelize, DataTypes) => {
  const TodoElement = sequelize.define(
    'TodoElement',
    {
      goal: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: [''] },
      },
    },
  );
  TodoElement.associate = (models) => {};
  return TodoElement;
};
