const getUsers = require('./controllers/users');
const getPolicies = require('./controllers/policies');
const auth = require('./middlewares/authentication');
const router = require('express').Router();

router.get('/user/:id_or_username', auth.userAndAdmin, getUsers);
router.get('/policy/:id_or_username', auth.adminOnly, getPolicies);

module.exports = router;
