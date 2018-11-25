const users = require('./controllers/users');
const policies = require('./controllers/policies');
const authorization = require('./controllers/authorization');
const authentication = require('./middlewares/authentication');
const router = require('express').Router();

router.post('/register', authorization.register);
router.post('/login', authorization.logIn);
router.get('/user/id/:id', authentication.session, users.byId);
router.get('/user/name/:name', authentication.session, users.byName);
router.get(
  '/policy/id/:id',
  authentication.session,
  authentication.admin,
  policies.byId
);
router.get(
  '/policy/name/:name',
  authentication.session,
  authentication.admin,
  policies.byName
);

module.exports = router;
