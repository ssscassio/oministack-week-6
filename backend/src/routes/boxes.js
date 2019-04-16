const express = require('express'),
  routes = express.Router();

// Creates /boxes post endpoint
routes.post('/', (req, res) => {
  res.json({
    title: 'Boxes'
  });
});

// Creates /boxes/:id get endpoint
routes.get('/:id', (req, res) => {
  res.json({
    title: `Boxes/${req.params.id}`
  });
});

// Creates /boxes/:id/files post endpoint
routes.post('/:id/files', (req, res) => {
  res.json({
    title: `Boxes/${req.params.id}/files`
  });
});

module.exports = routes;
