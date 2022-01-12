require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')

require('./config/routes')(app);

app.use(cors())
app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`)
});
