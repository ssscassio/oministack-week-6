const express = require('express'),
  routes = express.Router();

routes.use('/boxes', require('./boxes'));

module.exports = routes;
