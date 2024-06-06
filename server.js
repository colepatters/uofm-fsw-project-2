const express = require('express')
require('dotenv/config')
const exphbs = require('express-handlebars')
const path = require('path')

const hbs = exphbs.create()
const app = express()
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/profile/:userId', (req, res) => {
    res.render('profile')
})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
})