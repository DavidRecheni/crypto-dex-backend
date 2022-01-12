module.exports = function(app){

  app.use(require('../routes/index'))
  app.use(require('../routes/users/getUsers'))
  app.use(require('../routes/users/getUser'))
  app.use(require('../routes/users/postUser'))

}