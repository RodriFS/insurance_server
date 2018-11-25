const axios = require('axios');
require('dotenv');

const fetchById = async id => {
  let user;
  await axios
    .get(process.env.CLIENTS_URL)
    .then(res => {
      if (res.data && res.data.clients) {
        user = res.data.clients.find(el => el.id === id);
      }
    })
    .catch(err => {
      throw new Error(
        'users/fetchById: Something went wrong with the fetch',
        err
      );
    });
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
        'users/fetchByName: Something went wrong with the fetch',
        err
      );
    });
  return user;
};

module.exports = { fetchById, fetchByName };
