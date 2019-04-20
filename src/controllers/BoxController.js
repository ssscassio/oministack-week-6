const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);

    return res.json(box);
  }

  async show(req, res) {
    // Model Query findById: https://mongoosejs.com/docs/api.html#model_Model.findById
    // Populate document references: https://mongoosejs.com/docs/populate.html
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });
    /* Note: Model.populate() isn't the same of Populate
      Model.populate(): https://mongoosejs.com/docs/api.html#model_Model.populate
      Populate: https://mongoosejs.com/docs/populate.html 
    */
    return res.json(box);
  }
}

module.exports = new BoxController();
