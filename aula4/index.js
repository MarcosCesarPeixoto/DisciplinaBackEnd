const express = require('express');
const bodyparser = require('body-parser');
const app = express();

let port = 3000;

// *** Tratando post de um form event - inicio ...
app.use(bodyparser.urlencoded({extended: false})); // define que as informações do body serão simples(extended false) ou completas (extended true)
app.use('/cadastro', express.static(__dirname + '/public/cadastro')); // determinando a existencia de uma rota e para onde ele vai apontar por um endereço statico.

//definindo uma rota /login que fará um post a partir do form index.html definido na pasta dessa rota especificada '/public/login'
app.post('/cadastro', (req, res) => {
  console.log("Nome: " + req.body.nome);
  console.log("E-mail: " + req.body.email);
  console.log("Tipo de uso:" + req.body.tipouso);

  res.redirect('/');
});
// *** Tratando post de um form event - fim

// **** Tratando middlewares ********
const meu_middleware = function(req, res, next){
  console.log('Primeiro middleware');
  next();
}

const outro_middlware = function(req, res, next) {
  console.log('Segundo middleware');
  next();
}

const get_require_tempo = function(req, res, next) {
  let time_now = Date.now();
  let momento_atual = new Date(time_now);  
  req.request_time = momento_atual.toUTCString();
  next();
}

app.use(meu_middleware);
app.use(outro_middlware);
app.use(get_require_tempo);

// executando um middleware a partir de determinada rota -será chamado somente se a rota for acessada
app.get('/tempo', (req, res) => {
  console.log('middleware tempo');
  //res.redirect('/');
  res.send('Executando middleware tempo: ' + req.request_time);  
});

app.get('/', (req, res) => {
  // res.send('Aula 4' + ' - Acessado na rota em ' + req.request_time);
  res.send('Acessado na rota raiz');
  console.log('mesagem após os middleares');
  console.log('Acessado em ' + req.request_time);
});


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`) );