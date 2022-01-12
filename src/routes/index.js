const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.end("This is an REST API to serve Crypto-dex app.");
})

module.exports = router;