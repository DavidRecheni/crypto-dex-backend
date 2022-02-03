require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')

/*Swagger*/
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use(cors())
app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./config/routes')(app);
app.use(cors())

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`)
});
