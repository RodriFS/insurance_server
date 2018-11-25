const users = require('../models/users');

// calls fetch function from model
// if user exists, send the data to the user
// else, send 'Not found'
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

// calls fetch function from model
// if user exists, send the data to the user
// else, send 'Not found'
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
