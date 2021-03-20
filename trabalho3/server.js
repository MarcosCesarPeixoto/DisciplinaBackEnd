const express = require('express');
const app = express();

var path = require('path');

let port = 3000;

let minhas_rotas =  require('./rotas.js'); // contem o arquivo de roteamentos
app.use('/', minhas_rotas);  // vai usar o arquivo de configurações de rota verificar se é uma rota válida

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`) // o servidor continua levantado ouvindo novas requisições
});  

