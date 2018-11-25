const users = require('./controllers/users');
const policies = require('./controllers/policies');
const authorization = require('./controllers/authorization');
const authentication = require('./middlewares/authentication');
const router = require('express').Router();

router.post('/register', authorization.signIn);
router.get('/login', authorization.logIn);
router.get('/user/id/:id', authentication.userAndAdmin, users.byId);
router.get('/user/name/:name', authentication.userAndAdmin, users.byName);
router.get('/policy/id/:id', authentication.adminOnly, policies.byId);
router.get('/policy/name/:name', authentication.adminOnly, policies.byName);

module.exports = router;
