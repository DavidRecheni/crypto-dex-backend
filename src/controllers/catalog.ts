import { Router } from 'express';
import coins from '../services/catalog';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';

const router = Router();

/**
 * Get catalog by parameter
 */
router.get('/catalog/:parameter', (req, res) => {
  // #swagger.tags = ['Catalog']
  // #swagger.description = 'Get catalog lists based on parameter. Possible values: coin, , ,'

  switch (req.params.parameter) {
    case 'coin':
      res.status(200).json(responseBuilder(coins()));
      break;
    default:
      res.status(200).json(responseBuilder({ error: ERROR_CODES.Catalog.NotFound }));
  }
});

export default router;
