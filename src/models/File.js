const mongoose = require('mongoose');

// Ref: Creating Mongoose Schemas: https://mongoosejs.com/docs/guide.html#definition
const File = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// Define a virtual document property 'url'
// Ref about virtuals: https://mongoosejs.com/docs/guide.html#virtuals
File.virtual('url').get(function() {
  const url = process.env.URL || 'http://localhost:3333';
  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);
