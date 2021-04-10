const express = require('express');
const router2 = express.Router();
var bcrypt = require('bcryptjs');

// --------------- tratando autenticação - inicio ---------------------- //
const Contato = require('../models/contato');      // faz importação do schema (coleção)

router2.post('/signup', (req, res) => {
  
  Contato.findOne({nome: req.body.nome, email: req.body.email, tipouso: req.body.tipouso})
  .then(contato_atual => {
    if (contato_atual) {
      // Quando encontrar o registro nome + email + tipouso
      return res.status(400).json({contatoerror: "Já existe cadastro para esse nome/e-mail/tipo de uso"});
    } else {
      // Não encontrou e vai inserir o contato como novo registro
      const contato_novo = Contato({
        nome: req.body.nome,
        email: req.body.email,
        tipouso: req.body.tipouso,
        senha: req.body.senha,
      });

      // -------- criptografando a senha com bcrypt ------------//
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(contato_novo.senha, salt, function(err, hash) {
            // Armazena o hash recebido no banco de dados.
            if(err) throw err;
            contato_novo.senha = hash;

            // salvando no banco o novo registro de contato
            contato_novo.save()
            .then(p => res.json(p))                                                 // renderiza as informações do objeto que foi salvo no bd para que possam ser apresentado como retorno (se desejar)
            .catch(err => console.log(err));                                        // caso tenha ocorrido algum erro, apresenta 
        });
      });
    }
  }
  )
  .catch(err => console.log(err));
});
// --------------- tratando autenticação - fim ------------------------- //

router2.get("/", (req, res) => {
  res.json({status: "Acesso permitido"})
});

module.exports = router2;