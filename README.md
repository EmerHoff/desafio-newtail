
# Setup do Projeto

O projeto consiste em APIs que realizam o cadastramento das casas de Game Of Thrones. 
Foram desenvolvidas APIs para cadastro, busca e remoção das casas.
O projeto deve funcionar independente do editor de texto usado, mas eu recomendo utilizar o [Visual Studio Code](https://code.visualstudio.com/download)

### Desafio

- A API deve ser REST
- Para cada casa, os seguintes dados devem ser obtidos do banco de dados da aplicação, sendo inseridos individualmente:
    - Nome
    - Região
    - Ano de fundação
    - Atual Lord (Nas Informações do lord da casa, devemos armazenar em que temporadas esse personagem apareceu).

- Funcionalidades desejadas:
    - Adicionar uma casa (com nome, região, ano de fundação e atual lord) - Listar casas
    - Buscar por nome
    - Buscar por ID
    - Remover casa

### Tecnologias utilizadas

- Linguagem: Node.js
- Banco: PostgreSQL
- ORM: TyperORM
- Testes: Jest

### Como executar o projeto

A implementação é uma API REST simples que necessita realizar as instalações das seguintes ferramentas para funcionar:
 - [**NodeJS**](https://nodejs.org/en/download/): Ambiente de execução JavaScript server-side.
 - [**TypeScript**](https://www.typescriptlang.org/download): Adiciona tipagem ao JavaScript, permitindo ter um código mais organizado e legível.
 - [**Docker**](https://docs.docker.com/engine/install/ubuntu/): será utilizado um container rodando um banco postgres para ser nossa base de dados.
 
Após realizar instalar todas as ferramentas execute os seguintes passos:   
 - Dentro da pasta do repositório execute: ```npm install```
 - Crie um container postgres: ```docker run --name desafionewtail -e POSTGRES_DB=desafio-newtail-test -e POSTGRES_PASSWORD=bdnewtail -p 5432:5432 -d postgres```
 - Rode as migrations do banco de dados:  ```yarn typeorm migration:run```
 - Pronto, seu ambiente está configurado basta rodar: ```yarn start```
  
