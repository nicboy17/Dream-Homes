require('dotenv').config();
const app = require('../../app');
let request = require('supertest')(app);

module.exports = {
  login: (user) => {
    return request
      .post('/users/login')
      .send(user);
  },

  request
};