require('dotenv').config();
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// run the database
require('./db/db');

const app = express();

app.use(cookieParser());

// resave
// Forces the session to be saved back to the session store
// even if the session was never modified during the request
// -----------------------------------------------------------
// saveUninitialized
// Forces a session that is "uninitialized" to be saved to the store.
// A session is uninitialized when it is new but not modified.
app.use(
  session({
    key: 'user_sid',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24 //expires in 24 hours
    }
  })
);

app.use(bodyParser.json());

// use router file
app.use('/', router);

module.exports = app;
