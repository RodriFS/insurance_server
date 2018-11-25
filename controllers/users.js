const users = require('../models/users');

const byId = async (req, res) => {
  try {
    const user = await users.fetchById(req.params.id);
    if (user) {
      res.send(user);
      res.status(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const byName = async (req, res) => {
  try {
    const user = await users.fetchByName(req.params.name);

    if (user) {
      res.send(user);
      res.status(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { byId, byName };
