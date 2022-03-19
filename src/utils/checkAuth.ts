import express from 'express';
import { verify } from 'jsonwebtoken';
import ERROR_CODES from '../constant';
import responseBuilder from './responseBuilder';

type authRequest = {
  headers: {
    authorization: string
  },
  body: {
    userId: string | undefined
  }
}

export default async function checkAuth(
  req: express.Request<authRequest>,
  res: express.Response,
  next: Function,
) {
  try {
    const splitToken = req.headers.authorization.split(' ');
    if (!(splitToken.length === 2 && splitToken[0] === 'Bearer')) res.status(401).json(responseBuilder({ error: ERROR_CODES.Auth.unauthorized }));
    else {
      verify(
        splitToken[1],
        process.env.TOKEN_SECRET,
        (err, decoded: {publicAddress: string, userId: string}) => {
          if (err) throw err;
          req.body.userId = decoded.userId;
          next();
        },
      );
    }
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
