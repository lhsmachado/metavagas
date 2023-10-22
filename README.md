# Api - MetaVagas

A api tem como finalidade o uso para a busca de vagas de tecnologia, tambem é possivel adicionar vagas, criar um usuario assim como efetuar login. 

##  Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


###  Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
NodeJs
```

###  Instalação

Acima da lista de arquivos, clique em < > Código.<br>

<img alt="License" width="300px" src="https://docs.github.com/assets/cb-32892/mw-1440/images/help/repository/code-button.webp"><br>

Copie a URL do repositório.<br>

<img alt="License" width="300px" src="https://docs.github.com/assets/cb-45942/mw-1440/images/help/repository/https-url-clone-cli.webp"><br>

Abra Terminal na pasta que deseja clonar o repositorio

Digite git clone e cole a URL já copiada.
```
git clone https://github.com/lhsmachado/metavagas.git
```
Pressione ENTER para criar seu clone local.

### Rotas

-Login (post): Loga o usuario na api e fornece um token que possibilita a criação de vagas.
-Create User (post): Cria um usuário para poder acessar o sistema.
-Create Job (post): Cria uma descrição de vaga no banco de dados.
-Dashboard(get): Retorna um objeto com as cinco tecnologias mais procuradas e as cinco cidades que pesquisam a tecnologia top 1.
-Search Jobs(post): Faz a busca no banco de dados das vagas e retorna de acordo com os filtros selecionados.

##  Executando os testes

Para executar os testes unitarios será necessario utilizar a biblioteca Vitest.
para instalar o Vitest utilize:
```
npm install -D vitest OU yarn add -D vitest
```
para iniciar os testes basta utilizar o comando:
```
npm run test
```

##  Construído com

* [NodeJs](https://nodejs.org/pt-br/docs) - O framework
* [Express](https://expressjs.com/pt-br/guide/routing.html) - Para a construção do servidor
* [MongoDB](https://www.mongodb.com/docs/) - O banco de dados
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM para mongoDB
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Para criptografar a senha do usuario
* [JWT](https://jwt.io/introduction) - Para gerar o token de autenticação
* [yup](https://www.npmjs.com/package/yup) - Para validar os dados recebidos
* [Insomnia](https://insomnia.rest) - Para os testes de integração e a documentação
* [Vitest](https://vitest.dev) - Para os testes unitarios

