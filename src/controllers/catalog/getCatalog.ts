import { Router } from 'express';
import coins from '../../services/catalog';

const router = Router();

/**
 * Get catalog by parameter
 */
router.get('/catalog/:parameter', (req, res) => {
  // #swagger.tags = ['Catalog']
  // #swagger.description = 'Get catalog lists based on parameter. Possible values: coin, , ,'

  switch (req.params.parameter) {
    case 'coin':
      res.status(200).json(coins());
      break;
    default:
      res.status(200).json({ error: 'Catalog not found' });
  }
});

export default router;
