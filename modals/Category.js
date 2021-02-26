const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  category_name: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

module.exports = Category = mongoose.model('category', CategorySchema);
