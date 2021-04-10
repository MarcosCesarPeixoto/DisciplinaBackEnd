let express = require('express');  // fazendo uso da biblioteca express()
let router = express.Router(); // usando um submódulo do express que trata sobre rotas

// ***** Tratando body-parser *******
let bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended: false}));
router.use('/cadastro', express.static(__dirname + '/public/cadastro')); // determinando a existencia de uma rota e para onde ele vai apontar por um endereço statico.

const Contato = require('./models/contato');      // faz importação do schema (coleção)// definindo roteamento para autenticação no BD

const url = require('url');    // permite "resolver" e fazer o parse de um endereço que será acessado
const fs = require('fs');      // interação com sistemas de arquivos (permite acessar as informações de um arquivo para transmitir)
var path = require('path');

// ********* Métodos GET ********* /
{
router.get('/', (req, res) => {    // get trata as rotas, os dois parâmetros, o rais e o callback(req e res)
  console.log(req.url);  
  res.sendFile(path.join(__dirname + '/bemvindo.html'));  
});

router.get('/landinpage', (req, res)  => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + '/public/cadastro/index.html'));
});

router.get('/public/cadastro/saibamais.html', (req, res)  => {
  console.log(req.url);  
  res.sendFile(path.join(__dirname + '/public/cadastro/saibamais.html'));  
});

// ********* Recursos ************
router.get('/public/cadastro/imagens/mao.png', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/cadastro/imagens/mao.png'));
});

router.get('/public/cadastro/imagens/cadastrar.jpg', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/cadastro/imagens/cadastrar.jpg'));
});

router.get('/public/cadastro/imagens/simplicidade.png', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/cadastro/imagens/simplicidade.png'));
});

router.get('/public/cadastro/imagens/businessman.jpg', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/cadastro/imagens/businessman.jpg'));
});

router.get('/public/cadastro/imagens/grafico2.png', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/cadastro/imagens/grafico2.png'));
});
}
// ***** Mensagem Erro 404 *****
router.get('*', (req, res) => { // se não conseguir resolver a rota retorna erro 404
  res.status(404).send('<h1>Erro 404 - Página ou recurso não encontrado :(</h1>')
});

//********* Métodos POST ********* /
router.post("/auth", (req, res) => {
  console.log("chamou o post /auth");

  // trecho que não deu certo usando arquivo auth.js{
  // const auth = require("./routes/auth");                                                // cria um objeto auth que vai conter a rota de acesso ao banco de dados
  // router.use("/auth", auth);                                                            // Quando usuario acessar a rota /auth vai acessar o objeto auth que contem a rota de acesso (get())
  //}

  var bcrypt = require('bcryptjs');
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

module.exports = router; // exportando para que consiga ser usado no server.js (principal)