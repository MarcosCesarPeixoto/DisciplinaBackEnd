const { response } = require('express');
const express = require('express');
const app = express();

let port = 3000;

// get vai lidar com as requisições do cliente:
// O primeiro parâmetro é a rota, no caso a raiz
// o segundo parâametro é o callback, req e res
// e por fim a funcionalidade que estará em um arrow function
app.get('/', (req, res) => {  
  res.send("Ola, seja bem-vindo!");  // send, envia a resposta com conteudo textual que o cliente vai receber
});  

app.get('/sobre', (req, res)  => {
  res.send('<h1>Página Sobre</h1><br><p>Primeiro Parágrafo</p>');
});

app.get('/json', (req, res) => {
  res.status(200).json({usuario: "Marcos", id: 123});
})

app.get('/ab[1-9]cd', (req, res) => {
  res.send("Expresão regular")
});

let params_module =  require('./params.js'); // criando o objeto params_module que  contee as demais rotas acessíveis q está na propriaa pasta raiz
app.use('/', params_module);

app.post('/post/teste_post', (req, res) => {
  res.send("Acessando endereço pelo método POST");
});

app.get('*', (req, res) => { // se a requisiçãao não conseguir ser atendida retornar erro 404
  res.send("404 - Link informado é inválido:");
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`) ); // apos a resposta o servidor fica  escutando novas requisições


