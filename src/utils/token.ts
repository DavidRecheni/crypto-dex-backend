import jwt from 'jsonwebtoken';

export default function generateAccessToken(addressAndNonce:
    {publicAddress: string, nonce: number}) {
  return jwt.sign(addressAndNonce, process.env.TOKEN_SECRET, { expiresIn: 18000 });
}
