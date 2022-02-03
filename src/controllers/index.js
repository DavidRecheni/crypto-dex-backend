const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.end("Welcome to Chaintree API.");
})

module.exports = router;