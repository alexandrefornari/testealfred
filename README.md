# Aplicação de teste para a Alfred Delivery

## Requisitos

Desenvolva uma aplicação back-end em Node.Js. Utilize, preferencialmente, Express. Caso
deseje utilizar outro framework não tem problema, mas gostaríamos de ouvir o motivo da
escolha. A aplicação deve conter conexão com banco relacional e conter CRUD para pelo menos
4 entidades, preterivelmente contendo relações entre tais entidades. Conter testes
automatizados será considerado muito positivamente! Se desejar, pode utilizar mais
dependências para deixar o código mais limpo e eficiente. Caso deseje implementar CI/CD e
funcionalidades semelhante, é um bônus. Caso deseja fazer algo seguindo arquitetura de
microsserviços, também será um bônus.

## Rodando o projeto

Inicialmente precisamos instalar as dependências do projeto:

`npm install`


É necessário um banco de dados Postgres para a aplicação, abaixo segue um exemplo usando o docker:

`docker run --name postgres_teste -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres`


Com o banco de dados funcionando precisamos rodar as migrations para a criação da estrutura do banco de dados:

`npx sequelize-cli db:migrate`


Após as dependências instaladas e o banco de dados rodando e estruturado, podemos rodar o projeto localmente para testes:

`npm run dev`

ou ainda rodar o projeto:

`npm start`


## Estrutura do projeto

Toda minha carreira profissional foi voltada para a educação, com isso para o projeto pensei em algo que fizesse sentido nesse universo e desenvolvi um backend com a funcionalidade parecida com o TinCan (um concorrente do SCORM que permite colher dados sobre experiências em treinamentos de diversas formas, tanto online quanto offline).

A principal classe do projeto são os Statements, que podem ser interpretados com a seguinte premissa:

I did this

Cada statement contém 3 partes principais:

- I: indica o usuário que fez a ação (no projeto é identificado como o User, ou userId na tabela do statement)
- did: indica o verbo (ação) que foi concretizada pelo usuário (ex: finalizou, respondeu, visualizou). Para efeito de simplificação o campo verb na tabela do statement é apenas uma string, mas poderia ser um id para uma outra tabela com definições mais precisas da ação.
- this: indica o que ou onde a ação foi efetuada (ex: questionário, prova, treinamento, etc). Novamente para efeito de simplificação o compo object na tabela é um campo do tipo text, mas poderia ser um id  para outra tabela com informações mais ricas.

As outras tabelas definem a estrutura macro do projeto: um statement pertence a um usuário e a um projeto, e todo projeto pertence a uma compania. Usuários e companias não dependem de nada para existir, e poderíamos criar uma tabela de relacionamento many-to-many entre elas (uma tabela Employee por exemplo), mas ficou fora do escopo desse teste.

## URLs do projeto

As rotas do projetos estão definidas no arquivo src/routes.js, e são as seguintes:

Acessíveis pelo navegador:

/users - retorna um json com todos os usuários  
/users/:id - retorna apenas um usuário com o id especificado ou null

/company - retorna um json com todos as companhias  
/company/:id - retorna apenas uma companhia com o id especificado ou null

/project - retorna um json com todos os projetos  
/project/:id - retorna apenas um projeto com o id especificado ou null  
/project/company/:id - retorna um array com todos os projetos da companhia especificada pelo id ou um array vazio

/statement - retorna um json com todos os statements  
/statement/:id - retorna apenas um statement com o id especificado ou null  
/statement/project/:id - retorna um array com todos os statements do projeto especificado pelo id ou um array vazio  
/statement/user/:id - retorna um array com todos os statements do usuário especificado pelo id ou um array vazio


Acessíveis pelo metodo post (criação):

/users - necessário um json com os dados do usuário, ex:
`{
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
}`

/company - necessário um json com os dados da companhia, ex:
`{
    name: 'Minha companhia'
}`

/project - necessário um json com os dados do projeto, incluindo um id válido de uma companhia, ex:
`{
    name: 'Meu projeto',
    companyId: 1
}`

/statement - necessário um json com os dados do statement, incluindo um id válido de um projeto e um id válido de um usuário, ex:
`{
    userId: 1,
    projectId: 1,
    verb: 'ação executada',
    object: 'objeto da ação',
}`

Acessíveis pelo metodo delete (destruição):

/users/:id - apaga o usuário com o id especificado ou retorna um erro de usuário não encontrado

/company/:id - apaga a companhia com o id especificado ou retorna um erro de companhia não encontrada

/project/:id - apaga o projeto com o id especificado ou retorna um erro de projeto não encontrado

/statement/:id - apaga o statement com o id especificado ou retorna um erro de statement não encontrado