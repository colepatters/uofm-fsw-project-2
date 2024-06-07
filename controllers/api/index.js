const router = require("express").Router();

const questionRoutes = require("./questionRoutes");
const answerRoutes = require("./answerRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");

router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);
router.use("/comment", commentRoutes);
router.use("/user", userRoutes);

module.exports = router;
