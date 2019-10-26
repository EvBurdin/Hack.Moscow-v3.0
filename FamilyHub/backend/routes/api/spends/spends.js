const express = require('express');
const auth = require('../../../helpers/auth');

const router = express.Router();
const controller = require('./controller');

router.route('/').post(auth, controller.addSpend);
router
  .route('/category')
  .get(auth, controller.getSpendCategorys)
  .post(auth, controller.addSpendCategorys);
module.exports = router;
