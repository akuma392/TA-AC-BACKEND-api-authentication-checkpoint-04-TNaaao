var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middleware/auth');

router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    var profile = await User.findOne(
      { username: id },
      '_id username bio image email'
    );
    if (profile) {
      res.json({
        profile: profile,
      });
    } else {
      res.json({
        error: 'username doesnt exists',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth.verifyToken, async (req, res, next) => {
  let userId = req.user.userId;
  let id = req.params.id;

  var userToBeUpdated = await User.findOne({ username: id });
  console.log(userToBeUpdated);
  try {
    if (userId == userToBeUpdated.id) {
      var profile = await User.findByIdAndUpdate(userId, req.body.users);
      return res.json({
        profile: profile.userJSON1(profile),
      });
    } else {
      res.json({
        error: 'You are not authorized',
      });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
