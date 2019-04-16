const express = require('express'),
  routes = express.Router();

router.use('/boxes', require('./boxes'));

module.exports = router;
