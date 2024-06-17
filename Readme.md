# AnswerAI Backend Service


## Table of Contents

- [Backend](#backend)
  - [Prerequisites](#backend-prerequisites)
  - [Environment Variables](#backend-environment-variables)
  - [Database Setup](#backend-database-setup)
  - [Setup Instructions](#backend-setup-instructions)
  - [Running the Application](#backend-running-the-application)
  - [Running with Docker](#backend-running-with-docker)
  - [Testing](#backend-testing)
  - [API Endpoints](#api-endpoints)
- [License](#license)


## Backend

### Backend Prerequisites

- Node.js
- npm
- Docker


### Clone the repository:

```
git clone git@github.com:sumedhakoranga/Sumedha-Koranga-AnswersAI-Backend.git
cd Sumedha-Koranga-AnswersAi-Backend
```
### Backend Environment Variables

Create a `.env` file in the `Backend` directory and add the following variables:

```
DATABASE_STORAGE=./database.sqlite
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Backend Database Setup

The application uses SQLite as the database. Sequelize ORM is used to manage database interactions.

### Initialize Database

To initialize the database, run:

```
npx sequelize-cli db:migrate
```

### Backend Testing
### Running Tests
To run tests, use the following command:

```
npm test
```

### API Endpoints

### User Routes

- POST /api/users
  - Registers a new user.
  - Example request body:
```
{
  "email": "test@example.com",
  "password": "password"
}
```

- GET /api/users/:userId
  - Retrieves the details of a user by their ID.
  - Requires authentication.

### Question Routes
- POST /api/questions

  - Creates a new question.
  - Requires authentication.
  - Example request body:
  ```
  {
    "content": "What is Node.js?",
  }
  ```
- GET /api/questions/:questionId
  - Retrieves a question by its ID.
  - Requires authentication.

### Auth Routes
- POST /api/auth/login

  - Logs in a user and returns a JWT token.
  - Example request body

  ```
  {
  "email": "test@example.com",
  "password": "password"
  }
  ```

- POST /api/auth/logout
  - Logs out a user.

- POST /api/auth/refresh
  - Provides a new token.
  - Requires the current token to be sent in the request body.
  - Example request body:

```
{
  "token": "current_jwt_token"
}
```


