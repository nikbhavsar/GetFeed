const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
