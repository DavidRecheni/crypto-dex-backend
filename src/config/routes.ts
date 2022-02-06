import express from 'express';
import index from '../controllers/index';
import getUser from '../controllers/user/getUser';
import postUser from '../controllers/user/postUser';
import getWallet from '../controllers/wallet/getWallet';
import getCatalog from '../controllers/catalog/getCatalog';

export default (app: express.Application) => {
  app.use(index);
  app.use(getUser);
  app.use(postUser);
  app.use(getWallet);
  app.use(getCatalog);
};
