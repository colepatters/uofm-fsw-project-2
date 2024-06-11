const router = require("express").Router();

const {Question, Avatar} = require('../models');

const auth = require('../utils/auth');

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  };

  const avatarRawData = await Avatar.findAll();
  const avatars = avatarRawData.map(avatar => avatar.get({ plain: true }));

  console.log("avatar data ->", avatars);

  res.render("login", {
    avatars
  });
});

router.get('/', auth, async (req, res) => {
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

      logged_in: req.session.logged_in,

      question: randomQuestion,

    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/profile/:userId', auth, (req, res) => {
  res.render('profile')
});

module.exports = router;
