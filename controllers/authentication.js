const bcrypt = require('bcryptjs');
const users = require('../models/users');
const User = require('../db/UserSchema');

// register async function
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // if there is missing data, notify the user
  if (!name || !email || !password) {
    res.status(400);
    res.send(
      '<h1>Failed to create account</h1>' +
        "<p>Make sure you provided 'name', " +
        "'email' and 'password' keys with your request.</p>"
    );
  } else {
    // if there user already exists, notify the user
    User.findOne(
      { $or: [{ name: email.toLowerCase() }, { email: email.toLowerCase() }] },
      (err, user) => {
        if (err) {
          res.status(400);
          res.send(
            '<h1>Failed to create account</h1>' +
              '<p>There was a problem with the registration<p>'
          );
        } else if (user) {
          res.status(400);
          res.send(
            '<h1>Failed to create account</h1><p>Name or email already exist<p>'
          );
        }
      }
    );

    // if user doesn't exist, create new user
    // hash and salt password
    // assign a role
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await users.fetchByName(req.body.name);
    const role = user ? user.role : 'users';

    User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    })
      .then(user => {
        req.session.user = {
          id: user.name,
          email: user.email,
          role: user.role
        };
        res.status(200);
        res.send(
          '<h1>Welcome, your account was created!</h1>' +
            '<p>Check out our API documentation ' +
            "<a href='https://github.com/RodriFS/insurance_server'>HERE</a></p>"
        );
      })
      .catch(err => {
        res.status(400);
        res.send(
          '<h1>Failed</h1>' +
            "<p>there was a problem and the account wasn't created"
        );
      });
  }
};

// login async function
const logIn = (req, res) => {
  const { name, password } = req.body;

  // if there is missing data, notify the user
  if (!name || !password) {
    res.status(401);
    res.send(
      '<h1>Failed to authenticate</h1>' +
        "<p>Make sure you provided 'name' and 'password' keys with your request.</p>"
    );
  } else {
    // if user exists, log the user, else, reject the user
    User.findOne({ name }).then(user => {
      if (!user) {
        res.status(401);
        res.send('<h1>Failed to authenticate</h1><p>User not found<p>');
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(401);
        res.send('<h1>Failed to authenticate</h1><p>Password is invalid<p>');
      } else {
        req.session.user = {
          id: user.name,
          email: user.email,
          role: user.role
        };
        res.status(200);
        res.send(
          '<h1>Welcome back!</h1>' +
            '<p>Check out our API documentation ' +
            "<a href='https://github.com/RodriFS/insurance_server'>HERE</a></p>"
        );
      }
    });
  }
};

module.exports = { register, logIn };
