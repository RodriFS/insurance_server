const axios = require('axios');
require('dotenv');

// fetch policies by id
const fetchById = async id => {
  let user;
  let policy;

  // get request
  await axios
    .get(process.env.POLICIES_URL)
    .then(res => {
      // if there is data returned in the get request
      // find the policy with the correct id.
      // as id's are unique, i used find instead of filter
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

  // if the policy was found with that id, get the client id
  // and find the client information.
  if (policy) {
    // get request
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

// fetch policies by client name
const fetchByName = async name => {
  let user;
  //get request
  await axios
    .get(process.env.CLIENTS_URL)
    .then(res => {
      // if there is data returned in the get request
      // find the client with the correct name.
      // as names are unique in this case, i used find instead of filter
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

  // if the client was found with that name, get all the policies
  // under that client's id. I organized that information under
  // the user.policies key
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
