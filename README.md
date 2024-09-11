## Projeto para avaliação do 1º Bim. de Desafio Profissional VI 🚀

### Trabalho realizado por:

- Alison Luiz da Silva - RA: 22033281-2

---

Este é um projeto de avaliação do 1º bimestre da matéria Desafio Profissional Vi, onde é feito uma requisição para API externa buscando uma vasta quantidade de cartas do Magic the Gathering, salvando na base de dados.

Tecnologias utilizadas neste projeto:

- Backend: NestJS, TypeORM, PostgreSQL, Docker

## Dependências 📦

[Docker](https://www.docker.com/)

[PostgreSQL](https://www.postgresql.org/)

## Iniciando o projeto 🚩

```bash
$  git clone https://github.com/alison-luiz/esoft_mtg
```

```bash
$  cd esoft_mtg
```

#### 1. Usar o docker-compose.yml para compilar o projeto e iniciá-lo (na pasta raiz)

```bash
$  docker compose up --build
```

---

#### 2. Usar o gerenciador de pacotes [Yarn](https://yarnpkg.com/) para executar o backend em modo de desenvolvimento

#### Obs: Para iniciar no modo de desenvolvimento, fazer uma cópia do `.env.dev` para `.env`, e preencher a informação da conexão com banco de dados.

**Backend 🌐**

```bash
$  yarn
$  yarn start:dev
```

## Semeando o banco de dados 🌾

Com o servidor rodando, é preciso popular as informações iniciais do nosso banco de dados com os itens buscado mediante API externa.

Para isso basta acessar a rota abaixo, e executá-la.

- Seed - Buscar API MTG - http://localhost:3000//cards/seed

## Documentação/Endpoints 📰

Foi disponibilizado os arquivos de environment e collection da ferramenta [postman](https://www.postman.com/) contendo todos os endpoints feitos neste projeto.

[Collection]

[Environment]

Também contamos com uma documentação feita pelo [swagger](https://swagger.io/) que está disponibilizada na seguinte rota da API:

http://localhost:3000/docs/
