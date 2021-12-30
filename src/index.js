require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // import routes
    app.use(require('./routes/index'))
    app.use(require('./routes/users/getUsers'))
    app.use(require('./routes/users/getUser'))
    app.use(require('./routes/users/postUser'))

    app.listen(app.get('port'), () => {
      console.log(`App listening at http://localhost:${app.get('port')}`)
    })
  }).catch((e) => console.log('Error', e))
