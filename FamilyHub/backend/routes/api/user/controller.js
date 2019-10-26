/* eslint-disable no-await-in-loop */
const md5 = require('md5');

const {
  User, //
  Family,
  Todo,
  Calendar,
  TodoElement,
  Location,
} = require('../../../models/Index');

module.exports = {
  async getFamilies(req, res) {
    const { user } = req;
    const familys = await user.getFamilys();
    res.json(familys);
  },
  async setFamily(req, res) {
    const { user } = req;
    const { id } = req.body;
    await user.addFamilys(id);
    const family = await user.getFamilys();
    res.json(family);
  },
  async getTodos(req, res) {
    const { user } = req;
    const todos = await user.getTodos({
      attributes: { exclude: ['FamilyId'] },
      include: [
        { model: Family, attributes: ['id', 'familyName'] },
        { model: TodoElement, attributes: ['id', 'goal', 'active'] },
        { model: Location, attributes: ['name', 'latitude', 'longitude'] },
      ],
    });
    res.json(todos);
  },
  async addTodo(req, res) {
    const { user } = req;
    const {
      goal, //
      familyId: FamilyId,
      locationId: LocationId,
      todoElements,
    } = req.body;
    console.log(todoElements);

    const todo = await Todo.create({
      goal, //
      FamilyId,
      author: user.id,
      LocationId,
    });
    todoElements.forEach(async (el) => {
      await TodoElement.create({
        goal: el.text,
        active: true,
        TodoId: todo.id,
      });
    });
    res.json('success');
  },
  async updateTodo(req, res) {
    const { id, goal, active } = req.body;
    const todo = await Todo.findOne({ where: { id } });
    todo.goal = goal || todo.goal;
    todo.active = !!active;
    todo.save();
    res.json('success');
  },
  async deleteTodo(req, res) {
    const { id } = req.body;
    Todo.destroy({ where: { id } });
    res.json('success');
  },
  async getCalendar(req, res) {
    const { user } = req;
    const todos = await user.getCalendars({
      attributes: { exclude: ['FamilyId'] },
      include: [{ model: Family, attributes: ['id', 'familyName'] }],
    });
    res.json(todos);
  },
  async addCalendar(req, res) {
    const { user } = req;
    const {
      title, //
      text,
      dateStart,
      dateEnd,
      familyId: FamilyId,
      periodic,
      period,
    } = req.body;
    let periodStep = 0;
    switch (period) {
      case 'year':
        periodStep = 1000 * 60 * 60 * 24 * 365;
        break;
      case 'month':
        periodStep = 1000 * 60 * 60 * 24 * 30;
        break;
      case 'week':
        periodStep = 1000 * 60 * 60 * 24 * 7;
        break;
      case 'day':
        periodStep = 1000 * 60 * 60 * 24;
        break;
      default:
        periodStep = 1000 * 60 * 60 * 24 * 365;
    }
    if (periodic) {
      for (let i = 0; i < 100; i++) {
        const dateStartPer = new Date(dateStart).getTime() + i * periodStep;
        const dateEndPer = new Date(dateEnd).getTime() + i * periodStep;
        await Calendar.create({
          title,
          text,
          dateStart: new Date(dateStartPer),
          dateEnd: new Date(dateEndPer),
          FamilyId,
          author: user.id,
          periodicId: md5(dateStart + title + text),
        });
      }
    } else {
      await Calendar.create({
        title,
        text,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        FamilyId,
        author: user.id,
      });
    }
    res.json('success');
  },
  async updateCalendar(req, res) {
    const { user } = req;
    const {
      title, //
      text,
      dateStart,
      dateEnd,
      id,
    } = req.body;
    const calendar = await Calendar.findOne({ where: { id } });
    const updateObj = {
      title: title || calendar.title,
      text: text || calendar.text,
      dateStart: new Date(dateStart) || calendar.dateStart,
      dateEnd: new Date(dateEnd) || calendar.dateEnd,
    };

    if (calendar.periodicId) {
      await Calendar.update(updateObj, { where: { periodicId: calendar.periodicId } });
    } else {
      await Calendar.update(updateObj, { where: { id } });
    }
    calendar.save();
    res.json('success');
  },
  async deleteCalendar(req, res) {
    const { user } = req;
    const { id } = req.body;
    const calendar = await Calendar.findOne({ where: { id } });
    if (calendar.periodicId) {
      await Calendar.destroy({ where: { periodicId: calendar.periodicId } });
    } else {
      await Calendar.destroy({ where: { id } });
    }
    res.json('success');
  },
  async getUserInfo(req, res) {
    const { username } = req.params;
    const user = await User.findOne({ where: { username }, attributes: { exclude: ['hash', 'salt'] } });
    res.json(user);
  },
};
