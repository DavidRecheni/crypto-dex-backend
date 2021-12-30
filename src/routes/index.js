const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json(
    {
      "title": "This is an REST api to serve Crypto-dex app"
    }
  );
})

module.exports = router;