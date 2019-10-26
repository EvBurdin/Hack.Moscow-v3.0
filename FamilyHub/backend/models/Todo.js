module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      goal: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
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
  Todo.associate = (models) => {
    Todo.belongsTo(models.Family);
    Todo.belongsTo(models.User, { foreignKey: 'author' });
  };
  return Todo;
};
