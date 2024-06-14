const router = require("express").Router();
const { Question, Answer, User, Avatar, AnswerComment } = require("../../models");
const { auth } = require("../../utils/auth");

router.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByPk(questionId, {
      include: [
        { model: Answer,
          include: [{
            model: User,
            attributes: {
              exclude: ['password'],
            },
            include: [{ model: Avatar }]
          },
          { model: AnswerComment }],
        }],
    });

    if (!question) {
      res.status(404).json({ message: "Question not found!" });
      return;
    };

    const test = question.get({ plain: true });

    console.log('test test test', test.Answers);
    

    res.render("question", {
      question: question.get({ plain: true }),
      answers: question.Answers.map((answer) => answer.get({ plain: true })),
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
