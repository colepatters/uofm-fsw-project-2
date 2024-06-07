const router = require("express").Router();

const questionRoutes = require("./questionRoutes");
const answerRoutes = require("./answerRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
