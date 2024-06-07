const router = require("express").Router();
const { Answer, Comment } = require("../../models");
const { auth } = require("../../utils/auth");

// get the answers for a specific question
router.get("/:questionId", auth, async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.findAll({
      where: { question_id: questionId },
      include: { model: Comment },
    });

    res.json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post a new answer to a question
router.post("/:questionId", auth, async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const newAnswer = await Answer.create({
      ...req.body,
      question_id: questionId,
      user_id: req.session.user_id,
    });

    res.json(newAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
