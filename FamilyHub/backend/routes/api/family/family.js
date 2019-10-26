/* eslint-disable no-await-in-loop */
const express = require('express');
const auth = require('../../../helpers/auth');
const controller = require('./controller');

const router = express.Router();

router.route('/').post(auth, controller.addFamily);
router.route('/users').get(auth, controller.getUsers);
router.route('/coordinates').get(auth, controller.getCoordinates);
router.route('/todo').get(auth, controller.getTodos);
router.route('/calendar').get(auth, controller.getCalendar);
module.exports = router;
