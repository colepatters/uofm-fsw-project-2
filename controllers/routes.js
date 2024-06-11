const router = require("express").Router();
const {Question} = require('../models');

const auth = require('../utils/auth');

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  };

  res.render("login");
});

router.get('/', auth, async (req, res) => {
  try {
    // THIS IS NOT WORKING. YOU NEED TO RESEAECH THE SEQUELIZE FUNCTIONS. POSSIBLYY RETURN ALL THE DATA AND THEN CHOOSE A RANDON ITEM FROM THE ARRAY RETURNED
    // const randomQuestion = await Question.find({ order: "RANDOM()" });
  
    // const question = randomQuestion.get({plain: true})
    // console.log(question);
  
    res.render("home", {
      // question
    })
  } catch (error) {
    res.json(error)
  }
});

router.get('/profile/:userId', auth, (req, res) => {
  res.render('profile')
});

module.exports = router;
