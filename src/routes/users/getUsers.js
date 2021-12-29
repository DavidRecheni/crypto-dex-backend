const { Router } = require('express')
const router = Router()

router.get('/users', (req, res) => {
  res.json(
    [
      {
        "username": "Pepito",
        "wallet": "asdoipjrgiowiajsidoñjieñiajsojioieae",
        "description": "",
        "name": "Juan de los Palotes"
      },
      {
        "username": "Juanchi",
        "wallet": "asdosdasdasaiajsidoñjieñiajsojioierw",
        "description": "",
        "name": "Juan Zaba"
      },
    ]
  );
})

module.exports = router;