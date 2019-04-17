const express = require('express'),
  router = express.Router();

router.use('/boxes', require('./boxes'));

module.exports = router;
