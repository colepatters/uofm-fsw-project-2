const router = require("express").Router();
const { User, Avatar, Answer } = require("../../models");

// get user info
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    const userAnswers = await Answer.findAll({
      where: {
        user_id: req.params.id
      }
    })

    if (!userData) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.json({userData, answers: userAnswers});
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      display_name: req.body.display_name,
      username: req.body.username,
      password: req.body.password,
      avatar_id: req.body.avatar_id
    });

    const userData = dbUserData.get({ plain: true });

    console.log('userData', userData);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    
    console.log('userdata', userData.get({ plain: true }));

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
