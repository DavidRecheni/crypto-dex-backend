module.exports = function(app){

  app.use(require('../controllers/index'))

  app.use(require('../controllers/user/getUser'))
  app.use(require('../controllers/user/postUser'))

  app.use(require('../controllers/wallet/getWallet'))

  app.use(require('../controllers/catalog/getCatalog'))
}