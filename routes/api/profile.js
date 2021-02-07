const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../modals/Profile');
const User = require('../../modals/User');

//@route POST api/profile/me
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

//@route POST api/profile
//@desc Create or update user profile
//@access Private

router.post('/', auth, async (req, res) => {
  const { followers, following } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;
  followers
    ? (profileFields.followers = followers)
    : (profileFields.followers = []);
  following
    ? (profileFields.following = following)
    : (profileFields.following = []);

  try {
    let profile = Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
