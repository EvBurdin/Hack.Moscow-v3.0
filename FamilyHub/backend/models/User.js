const passportLocalSequelize = require('passport-local-sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
      },
      hash: {
        type: DataTypes.STRING(1234),
      },
      salt: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
        },
      },
      photo: {
        type: DataTypes.STRING,
      },
      family: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },

      scopes: {
        clear: {
          attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] },
        },
        minimum: {
          attributes: ['firstName', 'lastName', 'id'],
        },
      },
    },
  );

  passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'hash',
    saltField: 'salt',
  });
  User.associate = (models) => {
    User.hasMany(models.Coordinate);
    User.hasMany(models.Todo, { foreignKey: 'author' });
    User.hasMany(models.Calendar, { foreignKey: 'author' });
    User.hasMany(models.Event, { foreignKey: 'user' });
    User.hasMany(models.Event, { foreignKey: 'toWhom' });
    User.hasMany(models.Location);
    User.belongsToMany(models.Family, {
      through: 'UsersFamily',
      as: 'Familys',
      foreignKey: 'userId',
    });
  };
  return User;
};

// const db = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const UserSchema = new db.Schema({
//   username: String,
//   createDate: { type: Date, default: new Date() },
//   googleId: db.Schema.Types.Mixed,
//   firstName: String,
//   lastName: String,
//   fullName: String,
//   locale: String,
//   avatar: String,
//   email: String,
//   photo: String,
//   family: String,
// });

// UserSchema.statics.findOrCreate = async function (profile, accessToken, refreshToken, cb) {
//   let user = await this.findOne({ googleId: profile.id });
//   if (!user) {
//     user = new db.model('User', UserSchema)({
//       googleId: profile.id,
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       fullName: profile.displayName,
//       locale: profile._json.locale,
//       photo: profile.photos[0].value,
//       email: profile.emails[0].value,
//     });
//     await user.save();
//   }
//   const err = '';
//   cb(err, user);
// };
// UserSchema.plugin(passportLocalMongoose);
