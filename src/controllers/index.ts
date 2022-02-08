import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.end('Welcome to Chaintree API. Use /swagger for available endpoints.');
});

export default router;
