// criado o schema do contato
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContatoSchema = new Schema({                   // monta o schema que vai gerar a estrutura no MontoDb
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  tipouso: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now()
  },
});

// necessário alterar aqui
let Contato = mongoose.model("contato", ContatoSchema);    //faz o export, atraves do uso do método model que vai criar a estrutura: o primeiro parâmetro é o nome que será dado no schema e o segundo é o schema criado que será usado para criar

module.exports = Contato;