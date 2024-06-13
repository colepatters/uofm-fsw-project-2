
const errorHandler = (err, req, res, next) => {
    if (!err) next()

    res.render("error", { code: 500, error: err.message })
}

module.exports = errorHandler