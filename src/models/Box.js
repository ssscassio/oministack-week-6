const mongoose = require('mongoose');

// Ref: Creating Mongoose Schemas: https://mongoosejs.com/docs/guide.html#definition
const Box = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
  },
  {
    timestamp: true
  }
);

module.exports = mongoose.model('Box', Box);
