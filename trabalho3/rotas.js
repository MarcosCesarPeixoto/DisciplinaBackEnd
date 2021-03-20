let express = require('express');  // fazendo uso da biblioteca express()
let router = express.Router(); // usando um submódulo do express que trata sobre rotas

const url = require('url'); // permite "resolver" e fazer o parse de um endereço que será acessado
const fs = require('fs');      // interação com sistemas de arquivos (permite acessar as informações de um arquivo para transmitir)

var path = require('path');

//********* Métodos GET ********* /
router.get('/', (req, res) => {    // get trata as rotas, os dois parâmetros, o rais e o callback(req e res)
  console.log(req.url);  
  res.sendFile(path.join(__dirname + '/bemvindo.html'));
});

router.get('/landinpage/index.html', (req, res)  => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + '/landinpage/index.html'));
});

router.get('/landinpage', (req, res)  => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + '/landinpage/index.html'));
});

router.get('/landinpage/saibamais.html', (req, res)  => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + '/landinpage/saibamais.html'));
});

router.get('/json', (req, res) => {
  console.log(req.url);  
  res.status(200).json({usuario: "Marcos", id: 123});
})

router.get('/imagem[1-4]', (req, res) => { // Tratando Expresão regular"
  let expressao =  url.parse(req.url).pathname.substring(1);  // armazena em uma variável o caminho feito pelo usuario na url - uri: endereço do recurso a ser acessado
  let arquivo = path.join(__dirname + '/landinpage/imagens_extras/' + expressao + '.png');  

  console.log(arquivo);
  
  if (fs.existsSync(arquivo)){ 
    res.sendFile(arquivo);
  } else {
    res.send('<h1>Erro 404 - Página não encontrada :(</h1>');
  }
});

router.get('/:p', (req, res) => {
  let arquivo = path.join(__dirname + '/landinpage/imagens_extras/imagem' + req.params.p + '.png');
console.log(arquivo);
  if (fs.existsSync(arquivo)){ 
    res.sendFile(arquivo);
  } else {
    res.send('<h1>Erro 404 - Página não encontrada :(</h1>');
  }
});

router.get('*', (req, res) => { // se não conseguir resolver a rota retorna erro 404
  res.status(404).send('<h1>Erro 404 - Página ou recurso não encontrado :(</h1>')
});

//********* Métodos POST ********* /

router.post('/post/teste_post', (req, res) => {
  try {
    res.status(200).send("<h1>Simulando um método POST ;)</h1>");
  } catch {
    res.status(404).send("<h1>POST FALHOU :(</h1>");
  }  
});

router.post('*', (req, res) => { // se não conseguir resolver a rota retorna erro 404
  res.status(404).send("<h1>POST não pode ser executado :(</h1>");
});

module.exports = router; // exportando para que consiga ser usado no server.js (principal)