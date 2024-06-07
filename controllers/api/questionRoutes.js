const router = require("express").Router();
const { Question } = require("../../models");
const { auth } = require("../../utils/auth");

// get a random question to display for the user
router.get("/", auth, async (req, res) => {
  try {
    const randomQuestion = await Question.findOne({ order: "RANDOM()" });

    if (!randomQuestion) {
      res.status(404).json({ message: "No questions found!" });
      return;
    }

    res.json(randomQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
