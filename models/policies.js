const axios = require('axios');
require('dotenv');

const fetchById = async id => {
  let user;
  await axios
    .get(process.env.POLICIES_URL)
    .then(res => {
      if (res.data && res.data.policies) {
        policy = res.data.policies.find(el => el.id === id);
      }
    })
    .catch(err => {
      throw new Error(
        'users/fetchById: Something went wrong with the fetch',
        err
      );
    });

  if (policy) {
    await axios
      .get(process.env.CLIENTS_URL)
      .then(res => {
        if (res.data && res.data.clients) {
          user = res.data.clients.find(el => el.id === policy.clientId);
        }
      })
      .catch(err => {
        throw new Error(
          'policies/fetchByName: Something went wrong with the fetch',
          err
        );
      });
  }

  return user;
};

const fetchByName = async name => {
  let user;
  await axios
    .get(process.env.CLIENTS_URL)
    .then(res => {
      if (res.data && res.data.clients) {
        user = res.data.clients.find(
          el => el.name.toLowerCase() === name.toLowerCase()
        );
      }
    })
    .catch(err => {
      throw new Error(
        'policies/fetchByName: Something went wrong with the fetch',
        err
      );
    });

  if (user) {
    await axios
      .get(process.env.POLICIES_URL)
      .then(res => {
        if (res.data && res.data.policies) {
          user.policies = res.data.policies.filter(
            el => el.clientId === user.id
          );
        }
      })
      .catch(err => {
        throw new Error(
          'policies/fetchByName: Something went wrong with the fetch',
          err
        );
      });
  }

  return user;
};

module.exports = { fetchById, fetchByName };
