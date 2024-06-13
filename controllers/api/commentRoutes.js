const router = require("express").Router();
const { AnswerComment } = require("../../models");
const  auth  = require("../../utils/auth");

// post a new comment to an answer
router.post("/:answerId", auth, async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const newComment = await AnswerComment.create({
      ...req.body,
      answer_id: answerId,
      user_id: req.session.user_id,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
