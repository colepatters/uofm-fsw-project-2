const router = require("express").Router();
const { AnswerComment } = require("../../models");
const  auth  = require("../../utils/auth");

// post a new comment to an answer
router.post("/:answerId", auth, async (req, res) => {
  try {
    const answerId = parseInt(req.params.answerId);
    console.log('test', {
      answer_comment: req.body.answer_comment,
      answer_id: answerId,
      user_id: req.session.user_id,
    });
    const newComment = await AnswerComment.create({
      answer_comment: req.body.answer_comment,
      answer_id: answerId,
      user_id: req.session.user_id,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
