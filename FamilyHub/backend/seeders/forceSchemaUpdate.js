// const User = require('../models/User');
// const Сoordinates = require('../models/Сoordinates');
// const Family = require('../models/Family');
// const userFamily = require('../models/userFamily');

async function forceSchemaUpdate(models) {
  await models.User.sync({ alter: true });
  //   await User.create({ username: 'John', last_name: 'Hancock' });
  await models.Coordinate.sync({ alter: true });
  //   await Сoordinates.create({
  //     latitude: 55.7088878,
  //     longitude: 37.5927756,
  //     timestamp: 1570123187439,
  //     userId: 1,
  //   });
  await models.Family.sync({ alter: true });
  await models.UsersFamily.sync({ alter: true });
  await models.Todo.sync({ alter: true });
  await models.Calendar.sync({ alter: true });
  await models.Location.sync({ alter: true });
  await models.Event.sync({ alter: true });
  console.log('Seeding successed');
}
module.exports = forceSchemaUpdate;
