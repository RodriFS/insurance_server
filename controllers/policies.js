const policies = require('../models/policies');

const getPolicies = async (req, res) => {
  try {
    const policy = await policies.fetchById(req.params.id_or_username);
    res.body = policy;
    res.status = 200;
  } catch (err) {
    res.status = 400;
  }
};

module.exports = getPolicies;
