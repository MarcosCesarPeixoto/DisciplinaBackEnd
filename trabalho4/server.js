const express = require('express');
const app = express();

let port = 3000;

let minhas_rotas =  require('./rotas.js'); 
app.use('/', minhas_rotas);  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`) // o servidor continua levantado ouvindo novas requisições
});  

