## Projeto para avaliação do 1º Bim. de Desafio Profissional VI 🚀

### Trabalho realizado por:

- Alison Luiz da Silva - RA: 22033281-2

---

Este é um projeto de avaliação do 1º bimestre da matéria Desafio Profissional Vi, onde é feito uma requisição para API externa buscando uma vasta quantidade de cartas do Magic the Gathering, salvando na base de dados.

Tecnologias utilizadas neste projeto:

- NestJS, TypeORM, PostgreSQL, Docker, Redis.

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

**OBS:**

- Para mudar a quantidade de itens requisitado na API do Magic the Gathering, basta aumentar a quantidade do LAST_PAGE_NUMBER que esta no arquivo .env do projeto

- Também é preciso ter nível de Administrador para semear o banco.

![image](https://github.com/user-attachments/assets/20757760-478d-4291-acc8-77f5323722e5)

![image](https://github.com/user-attachments/assets/2528064f-88fa-40be-8f72-ccc72b868952)

## Importar Baralho 📎

Obs: Para importar um baralho via arquivo .json, é importante que o mesmo siga o modelo que está anexo no projeto.

Arquivo modelo: [import-deck.json](https://github.com/alison-luiz/esoft_mtg/blob/main/import-deck.json)

![image](https://github.com/user-attachments/assets/aefec83e-fa21-4f46-871a-7423a25bb8a4)

## Documentação/Endpoints 📰

Foi disponibilizado os arquivos de environment e collection da ferramenta [postman](https://www.postman.com/) contendo todos os endpoints feitos neste projeto.

[Collection](https://github.com/alison-luiz/esoft_mtg/blob/main/postman/DP%20VI%20-%20Magic%20the%20Gathering.postman_collection.json)

[Environment](https://github.com/alison-luiz/esoft_mtg/blob/main/postman/DP%20VI%20-%20Magic%20the%20Gathering.postman_environment.json)

Também contamos com uma documentação feita pelo [swagger](https://swagger.io/) que está disponibilizada na seguinte rota da API:

http://localhost:3000/docs/

![image](https://github.com/user-attachments/assets/40d56f7f-9ee4-4f6b-8809-9e77f2378306)
