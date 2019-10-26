const {
  Sequelize, //
  Event,
  User,
  sequelize,
} = require('../../../models/Index');

const { Op } = Sequelize;
module.exports = {
  async getEvents(req, res) {
    const { user } = req;
    const events = await Event.findAll({ where: { toWhom: user.id }, include: [{ model: User.scope('clear') }] });
    res.json(events);
    events.forEach((el) => Event.destroy({ where: { id: el.id } }));
  },
};
