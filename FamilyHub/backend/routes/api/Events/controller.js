const {
  Sequelize, //
  Event,
  User,
  UsersFamily,
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
  async addSosEvent(req, res) {
    const { user } = req;
    const familys = await user.getFamilys({ attributes: ['id'], joinTableAttributes: [] });
    const familysId = familys.map((el) => el.id);
    const familyUsers = await UsersFamily.findAll({
      where: { familyId: { [Op.in]: familysId } },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('userId')), 'userId']],
      distinct: true,
    });
    familyUsers.forEach(async (el) => {
      await Event.create({
        toWhom: el.userId,
        user: user.id,
        timestamp: new Date(),
        event: `ВНИМАНИЕ: пользователю ${user.fullName} срочно требуется помощь! Сигнал получен в ${(new Date()).toISOString()}`,
      });
    });
    res.json('success');
  },
};
