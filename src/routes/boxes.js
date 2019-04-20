const express = require('express'),
  routes = express.Router();
(BoxController = require('../controllers/BoxController')),
  (FileController = require('../controllers/FileController'));
const multer = require('multer'),
  multerConfig = require('../config/multer');
// Creates /boxes post endpoint
routes.post('/', BoxController.store);

// Creates /boxes/:id get endpoint
routes.get('/:id', BoxController.show);

// Creates /boxes/:id/files post endpoint
routes.post(
  '/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
);

module.exports = routes;
