const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Question } = require("../../models");
const { auth } = require("../../utils/auth");

// get a random question to display for the user
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.findAll();
    if (!questions.length) {
      res.status(404).json({ message: "No questions found!" });
      return;
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
