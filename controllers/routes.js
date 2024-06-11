const router = require("express").Router();
const { Question } = require("../models");

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll();
    if (questions.length === 0) {
      res.status(404).json({ message: "No questions found!" });
      return;
    }

    // Select a random question from the fetched questions
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex].get({ plain: true });

    res.render("home", {
      question: randomQuestion,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile/:userId", (req, res) => {
  res.render("profile");
});

module.exports = router;
