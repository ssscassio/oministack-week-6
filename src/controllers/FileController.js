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
    box.files.push(file);
    await box.save();

    // When a file is add to the database, emit a socket event
    // to each user at the box's socket room
    req.io.sockets.in(box._id).emit('file', file);

    // Response with the created File
    return res.json(file);
  }
}

module.exports = new FileController();
