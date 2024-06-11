const router = require("express").Router();
const { Question, Answer } = require("../../models");
const { auth } = require("../../utils/auth");

router.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByPk(questionId, {
      include: [{ model: Answer }],
    });

    if (!question) {
      res.status(404).json({ message: "Question not found!" });
      return;
    }

    res.render("question", {
      question: question.get({ plain: true }),
      answers: question.Answers.map((answer) => answer.get({ plain: true })),
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
