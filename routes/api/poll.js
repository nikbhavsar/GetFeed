const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');
const auth = require('../../middleware/auth');
const config = require('../../config/keys');

const User = require('../../modals/User');
const Poll = require('../../modals/Poll');
const Profile = require('../../modals/Profile');

const uploadImage = async (imageFile) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageFile, {
      upload_preset: 'get-feed',
    });
    return uploadResponse;
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

//@route POST api/polls
//@desc Create a poll
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('question', 'Question is required').not().isEmpty(),
      check('friendsList', 'Friends list is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const image1PublicId = (await uploadImage(req.body.opinionImage1))
        .public_id;
      const image2PublicId = (await uploadImage(req.body.opinionImage2))
        .public_id;

      const newPoll = new Poll({
        question: req.body.question,
        name: user.name,
        opinionImage1: image1PublicId,
        opinionImage2: image2PublicId,
        friendsList: req.body.friendsList,
        user: req.user.id,
      });

      const poll = await newPoll.save();

      //Saving poll id in profile
      const profile = await Profile.findOne({
        user: req.user.id,
      });

      profile.polls.unshift(poll._id);
      await profile.save();
      res.json(poll);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/polls
//@desc Get all polls
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const polls = await Poll.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/polls/:poll_id
//@desc Get Poll by Id
//@access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }
    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/like/1/:image_id
//@desc Like image 1 of the poll
//@access Private

router.put('/like/1/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Check if the poll already been voted
    const totalLikes = [...poll.opinionImage1Likes, ...poll.opinionImage2Likes];
    if (
      totalLikes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'poll already voted.',
      });
    }
    poll.opinionImage1Likes.unshift({
      user: req.user.id,
    });
    await poll.save();
    res.json(poll.opinionImage1Likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/like/2/:image_id
//@desc Like image 2 of the poll
//@access Private

router.put('/like/2/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Check if the poll already been voted
    const totalLikes = [...poll.opinionImage1Likes, ...poll.opinionImage2Likes];
    if (
      totalLikes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'poll already voted.',
      });
    }
    poll.opinionImage2Likes.unshift({
      user: req.user.id,
    });
    await poll.save();
    res.json(poll.opinionImage2Likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/unlike/1/:image_id
//@desc unLike image 1 of the poll
//@access Private

router.put('/unlike/1/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Check if the poll is not voted
    const totalLikes = [...poll.opinionImage1Likes, ...poll.opinionImage2Likes];
    if (
      totalLikes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        msg: 'poll has not yet been voted.',
      });
    }

    //Remove user from likes array

    const removeIndex = poll.opinionImage1Likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    poll.opinionImage1Likes.splice(removeIndex, 1);
    await poll.save();
    res.json(poll.opinionImage1Likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/unlike/2/:image_id
//@desc unLike image 2 of the poll
//@access Private

router.put('/unlike/2/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Check if the poll is not voted
    const totalLikes = [...poll.opinionImage1Likes, ...poll.opinionImage2Likes];
    if (
      totalLikes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        msg: 'poll has not yet been voted.',
      });
    }

    //Remove user from likes array

    const removeIndex = poll.opinionImage2Likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    poll.opinionImage2Likes.splice(removeIndex, 1);
    await poll.save();
    res.json(poll.opinionImage2Likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@route DELETE api/polls/:id
//@desc Get all polls
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    //Check user

    if (poll.user + '' !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized',
      });
    }
    await poll.remove();
    res.json({
      msg: 'Poll removed',
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
