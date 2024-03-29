const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');

const Profile = require('../../modals/Profile');
const User = require('../../modals/User');

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

//@route GET api/profile/me
//@desc Get current user profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
});

//@route GET api/profile
//@desc Get all profiles
//@access Public

router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/followers
//@desc Get followers profiles
//@access Private

router.get('/followers', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user.' });
    }

    const followersProfiles = await Profile.find({
      user: { $in: profile.followers },
    }).populate('user', ['name']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user.' });
    }
    res.json(followersProfiles);
  } catch (err) {
    console.error(err.message);
  }
});

//@route GET api/profile/following
//@desc Get following users profiles
//@access Private

router.get('/following', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user.' });
    }

    const followingProfiles = await Profile.find({
      user: { $in: profile.following },
    }).populate('user', ['name']);

    res.json(followingProfiles);
  } catch (err) {
    console.error(err.message);
  }
});

//@route GET api/profile/:user_id
//@desc Get user profile by user Id
//@access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', 'name');
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found.' });
    }
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private

router.post('/', auth, async (req, res) => {
  const profileFields = {};

  profileFields.user = req.user.id;

  profileFields.followers = [];

  profileFields.following = [];

  try {
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/follow
//@desc Follow or Unfollow user
//@access Private

router.put('/follow', auth, async (req, res) => {
  try {
    await Profile.findOneAndUpdate(
      { user: req.body.personToFollowId },
      { $push: { followers: req.user.id } },
      { new: true }
    );
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { following: req.body.personToFollowId } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/unfollow
//@desc Follow or Unfollow user
//@access Private

router.put('/unfollow', auth, async (req, res) => {
  try {
    await Profile.findOneAndUpdate(
      { user: req.body.personToUnFollowId },
      { $pull: { followers: req.user.id } },
      { new: true }
    );
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { following: req.body.personToUnFollowId } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/update-avatar
//Update user avatar
//@access Private

router.put('/update-avatar', auth, async (req, res) => {
  try {
    const image = await uploadImage(req.body.avatar);

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        avatar: `https://res.cloudinary.com/daqdhcvyv/image/upload/v1615793443/${image.public_id}`,
      },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
