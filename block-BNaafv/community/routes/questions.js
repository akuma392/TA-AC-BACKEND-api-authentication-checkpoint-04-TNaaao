var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../middleware/auth');
var Question = require('../models/question');
var Answer = require('../models/answer');

router.post('/', auth.verifyToken, async (req, res, next) => {
  req.body.question.author = req.user.userId;
  try {
    var question = await await Question.create(req.body.question);

    console.log(question);
    res.json({
      question: question,
    });
  } catch (error) {
    next(error);
  }
});
router.get('/', async (req, res, next) => {
  try {
    var questions = await Question.find()
      .sort({ createdAt: -1 })
      .populate('author', 'id bio email name username createdAt updatedAt')
      .exec();
    res.json({
      questions: questions,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth.verifyToken, async (req, res, next) => {
  let id = req.params.id;

  try {
    var question = await Question.findById(id);

    question.title = req.body.question.title;

    let updatedQuestion = await question.save();

    console.log(updatedQuestion);
    // if (question.author == req.user.userId) {
    //   var updatedQuestion = await Question.findByIdAndUpdate(
    //     id,
    //     req.body.question,
    //     { new: true }
    //   )
    //     .populate(
    //       'author',
    //       'id email bio username name image createdAt updatedAt'
    //     )
    //     .exec();

    //   res.json({
    //     question: updatedQuestion,
    //   });
    // } else {
    //   res.json({
    //     error: 'You are not authorized',
    //   });
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
