const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
  url: { type: String },
  created: { type: Date, default: Date.now },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } }],
});

module.exports = Image = mongoose.model('image', ImageSchema);
