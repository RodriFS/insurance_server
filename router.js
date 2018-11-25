const users = require('./controllers/users');
const policies = require('./controllers/policies');
const authorization = require('./controllers/authorization');
const authentication = require('./middlewares/authentication');
const router = require('express').Router();

// user registration
router.post('/register', authorization.register);

// user login
router.post('/login', authorization.logIn);

// get user data filtered by user id. Can be accessed by users with
// role 'users' and 'admin'
router.get('/user/id/:id', authentication.session, users.byId);

// get user data filtered by user name. Can be accessed by users with
// role 'users' and 'admin'
router.get('/user/name/:name', authentication.session, users.byName);

// get the list of policies linked to a user name. Can be accessed by
// users with the role 'admin' only
router.get(
  '/policy/id/:id',
  authentication.session,
  authentication.admin,
  policies.byId
);

// get the user data linked to a policy number. Can be accessed by
// users with the role 'admin' only
router.get(
  '/policy/name/:name',
  authentication.session,
  authentication.admin,
  policies.byName
);

module.exports = router;
