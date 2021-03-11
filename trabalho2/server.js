const http = require('http'); // Criando um objeto http via require (fará a troca de dados)
const url = require('url'); // permite "resolver" e fazer o parse de um endereço que será acessado
const fs = require('fs');   // interação com sistemas de arquivos (permite acessar as informações de um arquivo para transmitir)
const path = require('path'); // permite manipular caminhos (será usado para juntar nomes)

const hostname = '127.0.0.1'; // criando uma constante para armazenar o endereço da aplicação, no exemplo, a própria máquina 
const port = '3000'; // criando uma constante para armazenar a porta que será usada

// mimeType é uma maneira formal de definir um arquivo para q seja acessado/manipulado pela aplicação.
// Definindo os arquivos que serão acessados.
const mimeTypes = {
  html: "text/html",
  css: "test/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof"
};

// chamando o objeto http criado, fazendo uso do método create server, onde req é a requisição feita pelo cliente e res é a resposta do server
http.createServer((req, res) => {
  // especificando o que vai acontecer quando acessar 
  let acesso_uri =  url.parse(req.url).pathname;  // armazena em uma variável o caminho feito pelo usuario na url - uri: endereço do recurso a ser acessado
  let caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri)); // 'process' gera objeto com varias informações, usa metodo cwd que pega o caminho até a pasta onde está o objeto; decode() trata possíveis erros no endereço e o join() faz a concatenação;
  console.log(caminho_completo_recurso);

  let recurso_carregado;

  // tratando caso tente acessar algo que não existe
  try {
    recurso_carregado = fs.lstatSync(caminho_completo_recurso); // fs.lstatSync() permite acessar os recursos de um arquivo
  } catch {
    res.writeHead(404, {'content-type': 'text/plain'}); // código de retorno da requisição caso dê erro
    res.write('404: Arquivo não encontrado!');
    res.end();
    return; // não existindo o recurso solicitado retorna
  }

  // Faz uma verificação se o recurso acessado é um arquivo isFile()
  if (recurso_carregado.isFile()){
    let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)]; // extname() pega a extenção do recurso que está sendo acessado. substring() vai recortar o "."; identifica a extensão no mimeTypes possíveis criado
    
    res.writeHead(200, {'Content-Type': mimeType}); // escrevendo o pacote de resposta, 200=OK e o tipo de arquivo que será transmitido ao cliente
    let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso); // carregando o conteudo do arquivo e armazenado em uma variável
    fluxo_arquivo.pipe(res); // pipe() faz um empacotamento do arquivo e transmite ao cliente
  }else if(recurso_carregado.isDirectory()){
    // Quando é um diretório
    res.writeHead(302, {'Location': 'index.html'}); // 302 indica que o diretorio foi encontro e tenta localizar nele um arquivo index.html
    res.end();
  } else {
    // tratando caso não seja um arquivo ou diretorio
    res.writeHead(500, {'Content-Type': 'text/plain'}); // retorno erro 500
    res.write('500: Erro interno do servidor'); // escreve ao usuário mensagem de erro interno
    res.end();
  }
  // res.writeHead(200, {'Content-type': 'text/plain'});
  // res.write("Bem vindo ao Servidor Resp") 
  // res.end();
}).listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
}) ;