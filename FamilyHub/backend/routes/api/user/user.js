/* eslint-disable no-await-in-loop */
const express = require('express');
const auth = require('../../../helpers/auth');
const controller = require('./controller');

const router = express.Router();

router
  .route('/family')
  .get(auth, controller.getFamilies)
  .put(auth, controller.setFamily);

router
  .route('/todo')
  .get(auth, controller.getTodos)
  .post(auth, controller.addTodo)
  .put(auth, controller.updateTodo)
  .delete(auth, controller.deleteTodo);
router
  .route('/calendar')
  .get(auth, controller.getCalendar)
  .post(auth, controller.addCalendar)
  .put(auth, controller.updateCalendar)
  .delete(auth, controller.deleteCalendar);

router.route('/:username').get(auth, controller.getUserInfo);
module.exports = router;
