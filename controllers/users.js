const users = require('../models/users');

const getUsers = async (req, res) => {
  console.log('username');
  try {
    const user = await users.fetchById(req.params.id_or_username);
    res.body = user;
    res.status = 200;
  } catch (err) {
    res.status = 400;
  }
};

module.exports = getUsers;
