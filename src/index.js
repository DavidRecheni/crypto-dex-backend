const express = require('express')
const app = express()
app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

// import routes
app.use(require('./routes/index'))
app.use(require('./routes/users/getUsers'))

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`)
})