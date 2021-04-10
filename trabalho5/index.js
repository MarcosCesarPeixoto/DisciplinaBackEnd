const express = require("express");
const app = express();

let minhas_rotas =  require('./rotas.js'); 
app.use('/', minhas_rotas);  

// ---------- tratando banco de dados - inicio --------------//
const mongoose  = require("mongoose");
const db_access = require('./setup/db').mongoURL;                                     // o parâmetor é o acesso ao banco de dados - vai acessar o caminho ./setup/db e nesse arquivo pegar a informação de conexão, como está exportado, pode fazer uso direto da propriedade mongoURL

mongoose.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})        // aqui monta a estrutura de conexao aninhada - tenta o connect(), 
.then(() => console.log("Conexão ao banco de dados MongoDb executada com sucesso"))   // se sucesso executa o then() 
.catch(err => console.log(err));                                                      // caso contrário o catch()
// ---------- tratando banco de dados - fim -----------------//

// ---------- tratando login - inicio  ----------------------//
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));                                    // usando o body-parser
app.use(bodyparser.json());                                                           // informando ao app que vai transitar json

const auth = require("./routes/auth");                                                // cria um objeto auth que vai conter a rota de acesso ao banco de dados
app.use("/auth", auth);                                                               // Quando usuario acessar a rota /auth vai acessar o objeto auth que contem a rota de acesso (get())
// ---------- tratando login - fim---- ----------------------//


app.get("/", (req, res) => {
  res.send("Trabalho 5");
})

const port = 3000;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));