const express = require('express')
require('dotenv/config')
const exphbs = require('express-handlebars')
const path = require('path')

// require router in ./controllers
const router = require('./controllers/routes')

const hbs = exphbs.create()
const app = express()
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static(path.join(__dirname, "public")))

app.use(router)

const port = process.env.PORT ?? 3001
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})