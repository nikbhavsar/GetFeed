const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../modals/User');
const Category = require('../../modals/Category');

//@route GET api/category/:Category_id
//@desc get category by id
//@access Private
router.get('/:category_id', auth, async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.category_id,
    });
    if (!category) {
      return res.status(400).json({ msg: 'Category not found.' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Categoryy not found.' });
    }
    res.status(500).send('Server Error');
  }
});

//@route POST api/category
//@desc Create friends list for category
//@access Private

router.post(
  '/',
  [auth, [check('category_name', 'Category is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category_name, friends } = req.body;

    //Building object
    const profileFields = {};
    if (category_name) profileFields.category_name = category_name;
    if (friends) profileFields.friends = friends;

    try {
      let category = Category(profileFields);
      await category.save();
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { categories: category._id } },
        { new: true }
      );
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT api/category
//@desc add users to friends list for category
//@access Private

router.put('/add-friends', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.body.categoryId },
      { $push: { friends: req.body.userId } },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
