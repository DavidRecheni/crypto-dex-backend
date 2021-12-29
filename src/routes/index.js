const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json(
    {
      "title": "Hello world!!!"
    }
  );
})

module.exports = router;