# Puzzle Service

## Instalação

Para desenvolver esta aplicação, baixe este repositório usando o comando:

> git clone https://github.com/puzzle-technical/puzzle-service-api.git

Depois disto, entre no diretório e instale as dependências com o comando:

> npm install

## Desenvolvimento

Para iniciar um servidor com Node.js e testar a aplicação, use o comando:

> npm start

Este comando é um script que inicia o servidor com o arquivo "server.js" como ponto de entrada.

## API

Para utilizar a api, é necessário usar as rotas disponíveis. Abaixo estão as rotas disponíveis para cada classe.

User (Cliente)
----

  Param       | Tipo                | Required     | Descrição
  ----------- | :-----------------: | :----------: | ---------------------
  idUser      | int                 | (automático) | id do usuário
  cpfUser     | int                 | true         | cpf do usuário
  nome        | string              | true         | nome do usuário
  email       | string              | true         | email do usuário
  celular     | string              | true         | celular do usuário
  dataNasc    | string 'yyyy-mm-dd' | true         | data de nascimento do usuário
  logradouro  | string              | true         | logradouro do usuário
  numero      | string              | true         | numero do usuário
  complemento | string              | false        | complemento do usuário
  bairro      | string              | true         | bairro do usuário
  cidade      | string              | true         | cidade do usuário
  uf          | string              | true         | uf do usuário
  cep         | string              | true         | cep do usuário
  avaliacao   | float               | false        | avaliação do usuário
  senha       | string              | true         | senha do usuário

* **Find all**

  * Rota: /api/users <br>
  * Método: GET <br>
  * Retorno: Lista de todos os usuários

* **Find by id**

  * Rota: /api/users?idUser= <br>
  * Método: GET <br>
  * Retorno: Usuário com este id <br>
  * Parâmetros da query: <br>
    * idUser - Id do usuário em questão

* **Create**

  * Rota: /api/users/create <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * User - Objeto com os campos necessários para criar o usuário 
  
* **Update**

  * Rota: /api/users/update/:idUser <br>
  * Método: PUT <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idUser - Id do usuário em questão 
  * Parâmetros da requisição:
    * User - Objeto com os campos que deseja alterar

* **Delete**

  * Rota: /api/users/delete/:idUser <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idUser - Id do usuário em questão
  

Provider (Prestador)
----

  Param           | Tipo                | Required     | Descrição
  --------------- | :-----------------: | :----------: | ---------------------
  idProvider      | int                 | (automático) | id do prestador
  cpfProvider     | int                 | true         | cpf do prestador
  nome            | string              | true         | nome do prestador
  email           | string              | true         | email do prestador
  celular         | string              | true         | celular do prestador
  dataNasc        | string 'yyyy-mm-dd' | true         | data de nascimento do prestador
  logradouro      | string              | true         | logradouro do prestador
  numero          | string              | true         | numero do prestador
  complemento     | string              | false        | complemento do prestador
  bairro          | string              | true         | bairro do prestador
  cidade          | string              | true         | cidade do prestador
  uf              | string              | true         | uf do prestador
  cep             | string              | true         | cep do prestador
  avaliacao       | float               | false        | avaliação do prestador
  senha           | string              | true         | senha do prestador

* **Find all**

  * Rota: /api/providers <br>
  * Método: GET <br>
  * Retorno: Lista de todos os prestadores

* **Find by id**

  * Rota: /api/providers?idProvider= <br>
  * Método: GET <br>
  * Retorno: Prestador com este id <br>
  * Parâmetros da query: <br>
    * idProvider - Id do prestador em questão

* **Find by category**

  * Rota: /api/providers?idCategory= <br>
  * Método: GET <br>
  * Retorno: Lista de prestadores com esta categoria <br>
  * Parâmetros da query: <br>
    * idCategory - Id da categoria em questão

* **Create**

  * Rota: /api/providers/create <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * Provider - Objeto com os campos necessários para criar o prestador 
  
* **Update**

  * Rota: /api/providers/update/:idProvider <br>
  * Método: PUT <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idProvider - Id do prestador em questão
  * Parâmetros da requisição:  
    * Provider - Objeto com os campos que deseja alterar

* **Delete**

  * Rota: /api/providers/delete/:idProvider <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idProvider - Id do prestador em questão

* **Add a Category**

  * Rota: /api/providers/addCategory <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * idProvider - Id do prestador em questão
    * idCategory - Id da categoria em questão
  

* **Remove a Category**

  * Rota: /api/providers/:idProvider/removeCategory/:idCategory <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idProvider - Id do prestador em questão
    * idCategory - Id da categoria em questão
  

* **Get Categories**

  * Rota: /api/providers/:idProvider/getCategories <br>
  * Método: GET <br>
  * Retorno: Lista das categorias do prestador <br>
  * Parâmetros da requisição: 
    * idProvider - Id do prestador em questão



Category (Orçamento)
----

  Param       | Tipo                | Required     | Descrição
  ----------- | :-----------------: | :----------: | ---------------------
  idCategory  | int                 | (automático) | id da categoria
  nome        | string              | true         | nome da categoria

* **Find all**

  * Rota: /api/categories <br>
  * Método: GET <br>
  * Retorno: Lista de todas as categorias

* **Find by id**

  * Rota: /api/categories?idCategory= <br>
  * Método: GET <br>
  * Retorno: Categoria com este id <br>
  * Parâmetros da query: <br>
    * idCategory - Id da categoria em questão

* **Create**

  * Rota: /api/categories/create <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * Category - Objeto com os campos necessários para criar a categoria 
  
* **Update**

  * Rota: /api/categories/update/:idCategory <br>
  * Método: PUT <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idCategory - Id da categoria em questão
  * Parâmetros da requisição:  
    * Category - Objeto com os campos que deseja alterar

* **Delete**

  * Rota: /api/categories/delete/:idCategory <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idCategory - Id da categoria em questão
  



Service (Serviço)
----

  Param       | Tipo                | Required     | Descrição
  ----------- | :-----------------: | :----------: | ---------------------
  idService   | int                 | (automático) | id do serviço
  nome        | string              | true         | nome do serviço
  descricao   | string              | true         | descricao do serviço
  localizacao | string              | true         | localização do serviço
  dataPublic  | string 'yyyy-mm-dd' | true         | data da publicação do serviço
  idUser      | int                 | true         | id do usuário que criou o serviço

* **Find all**

  * Rota: /api/services <br>
  * Método: GET <br>
  * Retorno: Lista de todos os serviços

* **Find by id**

  * Rota: /api/services?idService= <br>
  * Método: GET <br>
  * Retorno: Serviço com este id <br>
  * Parâmetros da query: <br>
    * idService - Id do serviço em questão

* **Create**

  * Rota: /api/services/create <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * Service - Objeto com os campos necessários para criar o serviço 
  
* **Update**

  * Rota: /api/services/update/:idService <br>
  * Método: PUT <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idService - Id do serviço em questão
  * Parâmetros da requisição:  
    * Service - Objeto com os campos que deseja alterar

* **Delete**

  * Rota: /api/services/delete/:idService <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idService - Id do serviço em questão
  
* **Add a Category**

  * Rota: /api/services/addCategory <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * idService - Id do serviço em questão
    * idCategory - Id da categoria em questão
  
* **Remove a Category**

  * Rota: /api/services/:idService/removeCategory/:idCategory <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idService - Id do serviço em questão
    * idCategory - Id da categoria em questão
  
* **Get Categories**

  * Rota: /api/services/:idService/getCategories <br>
  * Método: GET <br>
  * Retorno: Lista das categorias do serviço <br>
  * Parâmetros da requisição: 
    * idService - Id do serviço em questão




Budget (Orçamento)
----

  Param       | Tipo                | Required     | Descrição
  ----------- | :-----------------: | :----------: | ---------------------
  idBudget    | int                 | (automático) | id do orçamento
  descricao   | string              | true         | descrição do orçamento
  dataFinal   | string 'yyyy-mm-dd' | true         | data final do orçamento
  idService   | int                 | true         | id do serviço deste orçamento
  idProvider  | int                 | true         | id do prestador deste orçamento

* **Find all**

  * Rota: /api/budgets <br>
  * Método: GET <br>
  * Retorno: Lista de todas os orçamentos

* **Find by id**

  * Rota: /api/budgets?idBudget= <br>
  * Método: GET <br>
  * Retorno: Orçamento com este id <br>
  * Parâmetros da query: <br>
    * idBudget - Id do orçamento em questão

* **Create**

  * Rota: /api/budgets/create <br>
  * Método: POST <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da requisição: 
    * Category - Objeto com os campos necessários para criar o orçamento 
  
* **Update**

  * Rota: /api/budgets/update/:idBudget <br>
  * Método: PUT <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idBudget - Id do orçamento em questão
  * Parâmetros da requisição:  
    * Category - Objeto com os campos que deseja alterar

* **Delete**

  * Rota: /api/budgets/delete/:idBudget <br>
  * Método: DELETE <br>
  * Retorno: Mensagem de sucesso ou erro <br>
  * Parâmetros da rota: 
    * idBudget - Id do orçamento em questão
  
