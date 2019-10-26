const express = require('express');
const auth = require('../../../helpers/auth');

const router = express.Router();
const controller = require('./controller');

router
  .route('/')
  .get(auth, controller.getMyCoordinates)
  .post(auth, controller.setMyCoordinates);
router
  .route('/location')
  .get(auth, controller.getLocations)
  .post(auth, controller.setLocation)
  .delete(auth, controller.deleteLocation);

module.exports = router;
