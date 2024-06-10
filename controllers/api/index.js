const router = require("express").Router();

// UNCOMMENT when db is set up
// const questionRoutes = require("./questionRoutes");
// const answerRoutes = require("./answerRoutes");
// const commentRoutes = require("./commentRoutes");
// const userRoutes = require("./userRoutes");

router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);
router.use("/comment", commentRoutes);
router.use("/users", userRoutes);

module.exports = router;
