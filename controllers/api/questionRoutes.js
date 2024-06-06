const router = require("express").Router();
const { Question, Answers } = require("../../models");
const { auth } = require("../../utils/auth");

// get a random question to display for the user
router.get("/", auth, async (req, res) => {
  try {
    const randomQuestion = await Question.findOne({ order: "RANDOM()" });

    if (!randomQuestion) {
      res.status(404).json({ message: "No questions found!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the answers for a specific question
router.get("/:id/answers", auth, async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await Answers.findAll({
      where: { question_id: questionId },
    });
    res.json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});
