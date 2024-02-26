<h1 align="center"> Pro-Match API - Nodejs </h1>

<h2>Índice</h2>

- <a href="#about">About
  - <a href="#api-features">API Features
  - <a href="#arquitecture">Architecture
- <a href="#technologies">Technologies
- <a href="#getting-started">Getting Started
  - <a href="#requirements">Requirements
  - <a href="#installation">Installation
  - <a href="#usage">Usage
- <a href="#routes">Routes
- <a href="#contato">Contact

<hr>

<h2 id="about">About</h2>

<p align="left">The Pro-Match API processes a professinal's data and applies business rules to assign a score to the professinal. Based on this score, the API selects matching projects for the professional while determining their eligibility for various projects. The implementation applies principles of Clean Architecture and Object Oriented Development. The backend application uses Node.js, TypeScript and Express.js. It has unit tests and E2E. And it run in a Docker container.
</p>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message= UNDER%20DEVELOPMENT &color=&style=for-the-badge"/>
</p>

<hr>

<h3 id="architecture">Architecture:</h3>

<p align="left">The API architecture follows an approach inspired by Clean Architecture, aiming to separate responsibilities and facilitate code maintenance, testability, and evolution. Regarding the layers used:

- In the **Domain** layer lies the heart of the application, which should be protected, where entities and interfaces containing the main concepts of the application's domain reside. Also, the contracts between different components of the application help decouple the components and facilitate the substitution of implementations.
- The **Application** layer contains the application's use cases. These represent the main functionalities of the application, where business logic is implemented. They bridge the gap between business requirements (defined at the domain level) and implementation details (defined in the infrastructure).
- The **Infrastructure** layer houses sample data that simulates the database. In this layer, repositories and services integrated into the application would also reside. Additionally, factories where objects are instantiated and helpers that provide auxiliary functions for the application.
- The **Presentation** layer comprises the application's controllers, responsible for receiving HTTP requests, invoking appropriate use cases, and returning the corresponding HTTP responses. Custom errors are also included to standardize how errors are handled and returned to API clients.
- In the **Main** layer, you will find the main configurations of the application such as server setup, routes, and the middlewares handling HTTP requests, including data validation before reaching the controllers.
</p>

<hr>

<h3 id="api-features">API Features:</h3>

- [x] assign project to the professional

<hr>

<!-- TECHNOLOGIES -->

<h2 id="technologies">Technologies</h2>
  
  - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
  - [NodeJS](https://nodejs.org/en/)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [Express Framework](https://expressjs.com/pt-br/)
  - [Docker](https://docs.docker.com/)
  - [Jest](https://jestjs.io/pt-BR/docs/getting-started)

<hr>

<h2 id="getting-started">Getting Started</h2>

<h3 id="requirements">Requirements</h3>

1. Node JS

```sh
https://nodejs.org/en/
```

2. Npm ou Yarn

```sh
https://www.npmjs.com/
```

3. Docker

```sh
https://docs.docker.com/get-docker/
```

<hr>

<h3 id="installation">Installation</h3>

1. Clone the repository:

   ```sh
   git clone https://github.com/LaomaNogueira/pro-match.git
   ```

2. Go to the project root folder:

   ```
   cd pro-match
   ```

   <hr>

<h3 id="usage">Usage</h3>

1. Copy the .env.example file, rename it to .env, create your environment variables and replace them.

2. Upload the server, run Docker in the root folder:

   ```sh
   docker-compose up
   ```

3. Access API routes:

   ```sh
   https://localhost:3000
   ```

4. Run the tests according to the commands below:

- All tests:

  ```sh
  docker exec Pro-Match npm run test
  ```

- Unit tests:

  ```sh
  docker exec Pro-Match npm run test:unit
  ```

- Integration tests:

  ```sh
  docker exec Pro-Match npm run test:integ
  ```

- Tests coverage:

  ```sh
  docker exec Pro-Match npm run test:cov
  ```

<hr>

<h2 id="routes">Routes</h2>

With the API working, test the routes via [Postman](https://www.postman.com/downloads/) or something similar.
Routes, payloads and parameters:

- **<u>Assign Projects to the Professional</u>** - rota: \_http://localhost:3001/pros/projects

  Body example:

  ```
                                                  | Is required?|    Type:   |   Observations:
  {
    "age": 47,                                    |  Required   |   Number   |
    "education_level": "high_school",             |  Required   |   String   |   Options: no_education | bachelors_degree_or_high | high_school
    "past_experiences": {
      "sales": true,                              |  Required   |   Boolean  |
      "support": true,                            |  Required   |   Boolean  |
    },
    "internet_test": {
      "download_speed": 60.2,                     |  Required   |   Number   |
      "upload_speed": 5.4,                        |  Required   |   Number   |
    },
    "writing_score": 0.5,                         |  Required   |   Number   |   Float between 0 and 1
    "referral_code": "token1234"                  |             |   String   |   Valid referral code
  }
  ```

  Output example:

  ```
  {
    "score": number,
    "selected_project": string,
    "eligible_projects": string[],
    "ineligible_projects": string[]
  }
  ```


<hr>

<!-- CONTACT -->

<h2 id="contato">Contact</h2>

#### Laoma Nogueira

<p align="left"> 💬 Let's talk? It will be great to swap ideas with you! Here are my contacts:: </p>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/laoma-nogueira/)](https://www.linkedin.com/in/laoma-nogueira/)
<a href="mailto:laomanogueira@gmail.com" alt="gmail" target="_blank">
<img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white&link=mailto:laomanogueira@gmail.com" /></a>

<hr>
