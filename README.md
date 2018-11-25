# Welcome to insurance_server

As an insurance company we've been asked to develop an application that manages some information about our insurance policies and company clients. To do that, we have two services that provide all the data we need:

• The list of company clients can be found at:
http://www.mocky.io/v2/5808862710000087232b75ac

• The list of company policies can be found at:
http://www.mocky.io/v2/580891a4100000e8242b75c5

## Approach

This excercise is done under the assumption that the clients have an account with the insurance provider, but the api is new. 
With that in mind, every user should register to this API in order to set a password. When registering, the API will asign the role of 'users' or 'admin' depending on what the client information says. If client is completely new, then the role defaults to 'users'.

## Authentication and authorization

Authentication is done by registering and login in, the system will assign a session and a cookie, that session will last 24 hours.
Authorization is done via a middleware that checks if the session is active. If administrator privileges are needed, there is another middleware that covers the endpoint.

## Endpoints
URL and PORT should be set up creating an .env file. Check out the .env.example inside the repo.

POST http://URL:PORT/register - send a POST request with a JSON object with the following information: name, email, password
```
{
  "name": "john",
  "email": "john@cool.com",
  "password": "iamsupercool"
}
```

POST http://URL:PORT/login - send a POST request with a JSON object with the following information: name, password
```
{
  "name": "john",
  "password": "iamsupercool"
}
```

GET http://URL:PORT/user/id/:id - Get user data filtered by user id. Can be accessed by users with role 'users' and 'admin'

GET http://URL:PORT/user/name/:name - Get user data filtered by user name. Can be accessed by users with role 'users' and 'admin'

GET http://URL:PORT/policy/id/:id - Get the list of policies linked to a user name. Can be accessed by users with the role 'admin' only

GET http://URL:PORT/policy/name/:name - Get the user data linked to a policy number. Can be accessed by users with the role 'admin' only

## Getting started

1. Clone the repo and enter
2. install the dependencies `npm i`
3. run the app! `npm start`
4. run the tests `npm test`

## Tech Stack

[Expressjs](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

[express-session](https://github.com/expressjs/session#readme) - Node.js module for creating a session middleware

[Mongoose](https://mongoosejs.com/) - No-relational schema-based databsase

[axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
