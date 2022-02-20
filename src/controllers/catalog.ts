import { Router } from 'express';
import coins from '../services/catalog';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';

const router = Router();

/**
 * Get catalog by parameter
 */
router.get('/catalog/:parameter', async (req, res) => {
  // #swagger.tags = ['Catalog']
  // #swagger.description = 'Get catalog lists based on parameter. Possible values: coin, , ,'

  let result = {};

  switch (req.params.parameter) {
    case 'coin':
      result = responseBuilder({ data: coins() });
      break;
    default:
      result = responseBuilder({ error: ERROR_CODES.Catalog.NotFound });
  }

  res.status(200).json(result);
});

export default router;
