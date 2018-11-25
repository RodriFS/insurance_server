const policies = require('../models/policies');

const byId = async (req, res) => {
  try {
    const policy = await policies.fetchById(req.params.id);
    if (policy) {
      res.status(200);
      res.send(policy);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

const byName = async (req, res) => {
  try {
    const policy = await policies.fetchByName(req.params.name);

    if (policy) {
      res.send(policy);
      res.status(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = { byId, byName };
