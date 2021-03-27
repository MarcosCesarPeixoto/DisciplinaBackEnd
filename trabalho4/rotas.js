let express = require('express');  // fazendo uso da biblioteca express()
let router = express.Router(); // usando um submódulo do express que trata sobre rotas

// ***** Tratando body-parser *******
let bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended: false}));
router.use('/cadastro', express.static(__dirname + '/public/cadastro')); // determinando a existencia de uma rota e para onde ele vai apontar por um endereço statico.

const url = require('url');    // permite "resolver" e fazer o parse de um endereço que será acessado
const fs = require('fs');      // interação com sistemas de arquivos (permite acessar as informações de um arquivo para transmitir)
var path = require('path');

{
//****** Middleware que não funcionou - Inicio */
// const meuCadastro = function(req, res, next){
//   console.log('Executando middleware meuCadastro');
//   router.use('/cadastro', express.static(__dirname + '/public/cadastro')); // determinando a existencia de uma rota e para onde ele vai apontar por um endereço statico.
//   next();
// }
//
// router.get('/cadastro', (req, res) => {
//   console.log('get /cadastro');
//   router.use(meuCadastro);  
// });
//****** Middleware que não funcionou - Fim*/
}

// ********* Métodos GET ********* /
router.get('/', (req, res) => {    // get trata as rotas, os dois parâmetros, o rais e o callback(req e res)
  console.log(req.url);  
  res.sendFile(path.join(__dirname + '/bemvindo.html'));  
});

router.get('/landinpage', (req, res)  => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + '/public/cadastro/index.html'));
});
// router.use('/landinpage', express.static(__dirname + '/public/cadastro/index.html')); 

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

// ***** Mensagem Erro 404 *****
router.get('*', (req, res) => { // se não conseguir resolver a rota retorna erro 404
  res.status(404).send('<h1>Erro 404 - Página ou recurso não encontrado :(</h1>')
});

//********* Métodos POST ********* /
router.post('/cadastro', (req, res) => {
  try {
    console.log('Nome: ' + req.body.nome);
    console.log('E-mail: ' + req.body.email);
    console.log('Tipo de Uso:' + req.body.tipouso);
    
    res.redirect('/');    
  } catch {
    res.status(404).send("<h1>Falha ao enviar formulário de dados(</h1>");
  }  
});

router.post('*', (req, res) => { // se não conseguir resolver a rota retorna erro 404
  res.status(404).send("<h1>POST não pode ser executado :(</h1>");
});

module.exports = router; // exportando para que consiga ser usado no server.js (principal)