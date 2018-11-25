const users = require('./controllers/users');
const policies = require('./controllers/policies');
const authentication = require('./controllers/authentication');
const authorization = require('./middlewares/authorization');
const router = require('express').Router();

// user registration
router.post('/register', authentication.register);

// user login
router.post('/login', authentication.logIn);

// get user data filtered by user id. Can be accessed by users with
// role 'users' and 'admin'
router.get('/user/id/:id', authorization.session, users.byId);

// get user data filtered by user name. Can be accessed by users with
// role 'users' and 'admin'
router.get('/user/name/:name', authorization.session, users.byName);

// get the list of policies linked to a user name. Can be accessed by
// users with the role 'admin' only
router.get(
  '/policy/id/:id',
  authorization.session,
  authorization.admin,
  policies.byId
);

// get the user data linked to a policy number. Can be accessed by
// users with the role 'admin' only
router.get(
  '/policy/name/:name',
  authorization.session,
  authorization.admin,
  policies.byName
);

module.exports = router;
