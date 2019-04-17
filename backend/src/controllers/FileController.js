const File = require('../models/File');
const Box = require('../models/Box');

class FileController {
  async store(req, res) {
    // Get the box instance
    const box = await Box.findById(req.params.id);

    // Create a new File at the mongo database
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    // Add the created file at the box.files array
    console.log('File', file);
    box.files.push(file);

    await box.save();

    return res.json(file);
  }
}

module.exports = new FileController();
