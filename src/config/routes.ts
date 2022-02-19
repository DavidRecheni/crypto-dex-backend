import express from 'express';
import cors from 'cors';
import index from '../controllers/index';
import user from '../controllers/user';
import wallet from '../controllers/wallet';
import catalog from '../controllers/catalog';
import address from '../controllers/address';
import auth from '../controllers/auth';

export default (app: express.Application) => {
  app.use(cors());
  app.use(auth);
  app.use(index);
  app.use(user);
  app.use(wallet);
  app.use(catalog);
  app.use(address);
};
