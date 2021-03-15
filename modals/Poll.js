const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: { type: String },
  question: { type: String },
  opinionImage1: {
    type: String,
  },
  opinionImage2: {
    type: String,
  },
  opinionImage1Likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  opinionImage2Likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  friendsList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Poll = mongoose.model('poll', PollSchema);
