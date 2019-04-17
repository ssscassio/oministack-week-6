const express = require('express'),
  routes = express.Router();
(BoxController = require('../controllers/BoxController')),
  (FileController = require('../controllers/FileController'));

// Creates /boxes post endpoint
routes.post('/', BoxController.store);

// Creates /boxes/:id get endpoint
routes.get('/:id', BoxController.show);

// Creates /boxes/:id/files post endpoint
routes.post('/:id/files', FileController.store);

module.exports = routes;
