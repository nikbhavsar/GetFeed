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
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const image1PublicId = uploadImage(data.opinionImage1);
      const image2PublicId = uploadImage(data.opinionImage2);

      const result = await Promise.all([image1PublicId, image2PublicId]);

      if (result) {
        const newPoll = new Poll({
          question: data.question,
          name: user.name,
          opinionImage1: result[0].public_id,
          opinionImage2: result[1].public_id,
          friendsList: data.friendsList,
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
      } else {
        res.status(500).send('Server Error');
      }
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

//@route GET api/polls/following
//@desc Get polls of following user
//@access Private

router.get('/following/polls', auth, async (req, res) => {
  try {
    const followingUsers = await Profile.findOne({ user: req.user.id });
    const followings = followingUsers.following;

    const profilesArray = await Profile.find({
      user: { $in: followings },
    });

    const pollsArray = profilesArray.map((profile) => {
      return profile.polls;
    });

    const polls = await Poll.find({ _id: { $in: pollsArray.flat() } }).sort({
      date: -1,
    });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/like/:image/:image_id
//@desc Like image 1 or 2 of the poll
//@access Private

router.put('/like/:image/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Check if the poll already been voted
    if (
      (await Poll.find({
        _id: req.params.id,
        $or: [
          { 'opinionImage1Likes.user': { $in: [req.user.id] } },
          { 'opinionImage2Likes.user': { $in: [req.user.id] } },
        ],
      }).count()) > 0
    ) {
      return res.status(400).json({
        msg: 'poll already voted.',
      });
    }
    poll[`opinionImage${req.params.image}Likes`].unshift({
      user: req.user.id,
    });
    await poll.save();
    res.json(poll[`opinionImage${req.params.image}Likes`]);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//@route PUT api/polls/unlike/:image/:image_id
//@desc unLike image 1 or 2 of the poll
//@access Private

router.put('/unlike/:image/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        msg: 'Poll not found',
      });
    }

    //Remove user from likes array

    const removeIndex = poll[`opinionImage${req.params.image}Likes`]
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    poll[`opinionImage${req.params.image}Likes`].splice(removeIndex, 1);
    await poll.save();
    res.json(poll[`opinionImage${req.params.image}Likes`]);
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
