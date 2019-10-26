/* eslint-disable no-await-in-loop */
const express = require('express');

const {
  User, //
  Coordinate,
  Family,
  Sequelize,
  Todo,
  Calendar,
  Spend,
  SpendCategory,
  TodoElement,
  Location,
  sequelize,
} = require('../../../models/Index');

const { Op } = Sequelize;

module.exports = {
  async addFamily(req, res) {
    const { user } = req;
    const { familyName } = req.body;
    const family = await Family.create({ familyName });
    user.addFamilys(family.id);
    res.json(family);
  },
  async getUsers(req, res) {
    const { user } = req;
    const family = await user.getFamilys({
      attributes: ['id', 'familyName'],
      joinTableAttributes: [],
      include: [
        {
          model: User.scope('clear'),
          as: 'Users',
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(family);
  },
  async getCoordinates(req, res) {
    const { user } = req;
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    let family = await user.getFamilys({
      attributes: ['id', 'familyName'],
      joinTableAttributes: [],
      include: [
        {
          model: User.scope('clear'),
          as: 'Users',
          attributes: ['username'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Coordinate,
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('DATE', sequelize.col('timestamp')), sequelize.literal('CURRENT_DATE')),
                  // { UserId: { [Op.ne]: user.id } },
                ],
              },
              attributes: ['latitude', 'longitude', 'timestamp'],
            },
          ],
        },
      ],
    });
    // magic!!!! dont touch!
    family = JSON.parse(JSON.stringify(family.map((el) => el.toJSON())));
    for (let i = 0; i < family.length; i++) {
      const { Users } = family[i];
      for (let j = 0; j < Users.length; j++) {
        Users[j].Coordinates.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        Users[j].Coordinates = Users[j].Coordinates.pop();
      }
    }
    // mistic staring
    // let a = [family[0].toJSON(),family[1].toJSON()];
    return res.json(family);
  },
  async getTodos(req, res) {
    const { user } = req;
    const todos = await user.getFamilys({
      joinTableAttributes: [],
      attributes: ['id', 'familyName'],
      include: [
        {
          model: Todo,
          attributes: { exclude: ['FamilyId'] },
          include: [
            { model: User.scope('clear') },
            { model: TodoElement, attributes: ['id', 'goal', 'active'] },
            { model: Location, attributes: ['name'] },
          ],
        },
      ],
    });
    res.json(todos);
  },
  async getCalendar(req, res) {
    const { user } = req;
    const calendar = await user.getFamilys({
      joinTableAttributes: [],
      attributes: ['id', 'familyName'],
      include: [
        {
          model: Calendar,
          attributes: { exclude: ['FamilyId', 'createdAt', 'updatedAt'] },
          include: [{ model: User.scope('clear') }],
        },
      ],
    });
    res.json(calendar);
  },
  async getSpends(req, res) {
    const { user } = req;
    let { date } = req.query;
    date = new Date(date);
    console.log(date);
    const monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(monthStartDay);

    const spends = await user.getFamilys({
      joinTableAttributes: [],
      attributes: ['id', 'familyName'],
      include: [
        {
          model: Spend,
          // where: { date: { $gte: monthStartDay } },
          where: { date: { [Op.between]: [monthStartDay, monthEndDay] } },
          attributes: { exclude: ['FamilyId', 'createdAt', 'updatedAt', 'categoryId', 'UserId'] },
          include: [
            {
              model: User.scope('minimum'),
            },
            {
              model: SpendCategory,
              as: 'category',
              attributes: ['label'],
            },
          ],
        },
      ],
    });
    res.json(spends);
  },
  async getTotalSpends(req, res) {
    const { user } = req;
    let { date } = req.query;
    date = new Date(date);
    console.log(date);
    const monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(monthStartDay);

    // const spends = await user.getFamilys({
    //   joinTableAttributes: [],
    //   attributes: ['id', 'familyName'],
    //   group: ['Family.id'],
    //   include: [
    //     {
    //       model: Spend,
    //       // where: { date: { $gte: monthStartDay } },
    //       where: { date: { [Op.between]: [monthStartDay, monthEndDay] } },
    //       attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    //       include: [
    //         {
    //           model: SpendCategory,
    //           as: 'category',
    //           attributes: ['name'],
    //         },
    //       ],
    //     },
    //   ],
    // });
    const familys = await user.getFamilys({
      attributes: ['id'],
    });
    console.log(familys[0].id);
    const familyId = familys[0].id;

    const spends = await Spend.findAll({
      attributes: ['categoryId', [sequelize.fn('sum', sequelize.col('price')), 'total']],
      group: ['categoryId', 'category.id', 'category.label'],
      where: { date: { [Op.between]: [monthStartDay, monthEndDay] }, FamilyId: familyId },
      include: [
        {
          model: SpendCategory,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
          group: ['categoryId'],
        },
      ],
    });
    res.json(spends);
  },
};
