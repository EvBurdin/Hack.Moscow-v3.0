/* eslint-disable no-cond-assign */
const io = require('socket.io');
const {
  Coordinate, //
  Location,
  Sequelize,
  sequelize,
  Family,
  User,
  UsersFamily,
  Event,
} = require('../../../models/Index');

const { Op } = Sequelize;
module.exports = {
  async getMyCoordinates(req, res) {
    res.json(await req.user.getCoordinates({ limit: 1, order: [['timestamp', 'DESC']] }));
  },
  async setMyCoordinates(req, res) {
    const { user } = req;
    const { id: UserId } = req.user;
    const {
      accuracy, //
      altitude,
      heading,
      latitude,
      longitude,
      timestamp,
      speed,
    } = req.body;
    const lastCoordinate = await Coordinate.findOne({
      where: { UserId: user.id },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    const familys = await user.getFamilys({ attributes: ['id'], joinTableAttributes: [] });
    const familysId = familys.map((el) => el.id);
    const jsonGeo = JSON.stringify({ type: 'Point', coordinates: [longitude, latitude] });
    const radius = 0.005;
    const curLoccation = await sequelize.query(
      `SELECT *
      FROM "Locations"
      WHERE ST_DWithin(
        point,
        ST_GeomFromGeoJSON(:jsonGeo),
        :radius
      ) AND "FamilyId" in(:familysId);`,
      {
        replacements: { jsonGeo, radius, familysId },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    const nowLocation = curLoccation.length !== 0 ? curLoccation[0].name : '';
    if (!lastCoordinate) {
      Coordinate.create({
        accuracy,
        altitude,
        heading,
        latitude,
        longitude,
        speed,
        timestamp: new Date(+timestamp),
        UserId,
        location: nowLocation,
      });
      res.json('success');
      return;
    }
    Coordinate.create({
      accuracy,
      altitude,
      heading,
      latitude,
      longitude,
      speed,
      timestamp: new Date(+timestamp),
      UserId,
      location: nowLocation,
    });
    let event = '';
    if (!lastCoordinate.location) {
      if (nowLocation) {
        event = `Прибыл в ${nowLocation}`;
      }
    } else {
      if (nowLocation !== lastCoordinate.location) {
        event = `Убыл из ${lastCoordinate.location} прибыл в ${nowLocation}`;
      }
      if (nowLocation === '') {
        event = `Убыл из ${lastCoordinate.location}`;
      }
    }
    const familyUsers = await UsersFamily.findAll({
      where: { familyId: { [Op.in]: familysId } },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('userId')), 'userId']],
      distinct: true,
    });
    familyUsers.forEach((el) => {
      if (event) {
        Event.create({
          toWhom: el.userId,
          user: user.id,
          timestamp: new Date(+timestamp),
          event,
        });
      }
    });
    res.json(curLoccation);
  },
  async getLocations(req, res) {
    const { user } = req;
    const familys = await user.getFamilys({ attributes: ['id'], joinTableAttributes: [] });
    const familysId = familys.map((el) => el.id);

    const locations = await Location.findAll({
      where: { FamilyId: { [Op.in]: familysId } },
      include: [{ model: User.scope('clear') }],
    });

    res.json(locations);
  },
  async setLocation(req, res) {
    const { id: UserId } = req.user;
    console.log(UserId);
    const {
      name, //
      description,
      latitude,
      longitude,
      FamilyId,
    } = req.body;
    const point = { type: 'Point', coordinates: [longitude, latitude] };
    const location = await Location.create({
      name,
      description,
      latitude,
      longitude,
      point,
      FamilyId,
      UserId,
    });

    res.json(location);
  },
  async deleteLocation(req, res) {
    const { id } = req.body;
    await Location.destroy({
      where: { id },
    });
    res.json('success');
  },
};
