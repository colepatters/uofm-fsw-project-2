const router = require("express").Router();

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get('/', (req, res) => {
  res.render("home")
});

router.get('/profile/:userId', (req, res) => {
  res.render('profile')
});

module.exports = router;
