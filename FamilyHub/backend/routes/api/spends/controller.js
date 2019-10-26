const {
  Sequelize, //
  Spend,
  SpendCategory,
  sequelize,
} = require('../../../models/Index');

const { Op } = Sequelize;
module.exports = {
  async addSpend(req, res) {
    const { user } = req;
    const UserId = user.id;
    const {
      categoryId, //
      price,
      date,
      FamilyId,
      comment,
    } = req.body;
    const spend = await Spend.create({
      categoryId, //
      price,
      date: new Date(date),
      FamilyId,
      comment,
      UserId,
    });
    res.json(spend);
  },
  async getSpendCategorys(req, res) {
    const spandCategorys = await SpendCategory.findAll();

    res.json(spandCategorys);
  },
  async addSpendCategorys(req, res) {
    const { name } = req.body;
    const newCategory=await SpendCategory.create({
      name,
    });

    res.json(newCategory);
  },
};
