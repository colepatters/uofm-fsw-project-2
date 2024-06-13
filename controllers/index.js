const router = require("express").Router();

const apiRoutes = require("./api");
const routes = require("./routes");

router.use("/", routes);
router.use("/api", apiRoutes);

router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router;
