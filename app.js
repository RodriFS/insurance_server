const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./db/db');

const app = express();

app.use(cookieParser());
app.use(
  session({
    key: 'user_sid',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
);

app.use(bodyParser.json());
app.use('/', router);

module.exports = app;
