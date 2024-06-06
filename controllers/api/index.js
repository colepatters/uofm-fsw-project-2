const router = require("express").Router();

const questionRoutes = require("./questionRoutes");

router.use("/question", questionRoutes);

module.exports = router;
