const request = require('supertest');
var faker = require('faker');

describe('loading express and endpoints', () => {
  let server;
  beforeEach(() => {
    server = require('../app');
  });
  describe('Endpoint /register', () => {
    it('400 if data is missing', () => {
      request(server)
        .post('/register')
        .send({ name: 'john' })
        .set('Accept', 'application/json')
        .expect(400);
    });
    it('400 if user already exists', () => {
      request(server)
        .post('/register')
        .send({ name: 'john', email: 'john@cool.com', password: 'helloworld' })
        .set('Accept', 'application/json');

      request(server)
        .post('/register')
        .send({ name: 'john', email: 'john@cool.com', password: 'helloworld' })
        .set('Accept', 'application/json')
        .expect(400);
    });
    it('200 if user was created', () => {
      request(server)
        .post('/register')
        .send({
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .set('Accept', 'application/json')
        .expect(400);
    });

    describe('Endpoint /signin', () => {
      it('400 if data is missing', () => {
        request(server)
          .post('/signin')
          .send({ name: 'john' })
          .set('Accept', 'application/json')
          .expect(400);
      });
      it('400 if user is not found', () => {
        request(server)
          .post('/signin')
          .send({ name: 'notauser', password: 'password' })
          .set('Accept', 'application/json')
          .expect(400);
      });
      it('400 if password is invalid', () => {
        request(server)
          .post('/signin')
          .send({ name: 'john', password: 'incorrectpassword' })
          .set('Accept', 'application/json')
          .expect(400);
      });
      it('200 if user and password is correct', () => {
        request(server)
          .post('/signin')
          .send({ name: 'john', password: 'helloworld' })
          .set('Accept', 'application/json')
          .expect(200);
      });
    });
    it('404 everything else', () => {
      request(server)
        .get('/foo/bar')
        .expect(404);
    });
  });
});
