const mongoose = require('mongoose');

// Generic CMS content model: store sections/pages by key
const ContentBlockSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    json: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

