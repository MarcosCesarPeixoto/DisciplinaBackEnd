let express = require('express');
let router = express.Router(); // defindo um submoddulo de express que trata roteamentos

router.get('/:p', (req, res) => {
  res.send("Informmado parâmetro  " + req.params.p);
});

router.get('/user/:u/nome/:n', (req, res) => {
  res.send("Acessado usuario " + req.params.u + " de nome " + req.params.n);
});

module.exports = router; // exportando o objeto para poder ser acessado de outros locais
