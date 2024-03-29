import jwt from 'jsonwebtoken';

export default function generateAccessToken(addressAndNonce:
    {publicAddress: string, userId: string}) {
  return jwt.sign(addressAndNonce, process.env.TOKEN_SECRET, { expiresIn: 18000 });
}
