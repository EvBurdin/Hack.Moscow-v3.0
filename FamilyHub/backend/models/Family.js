module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    familyName: {
      type: DataTypes.STRING,
    },
  });
  Family.associate = (models) => {
    Family.belongsToMany(
      models.User,
      {
        through: 'UsersFamily',
        as: 'Users',
        foreignKey: 'familyId',
      },
      {
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      },
    );
    Family.hasMany(models.Todo);
    Family.hasMany(models.Calendar);
    Family.hasMany(models.Location);
    Family.hasMany(models.Spend);
  };
  return Family;
};
