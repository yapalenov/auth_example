require('dotenv').config();
const request = require('supertest');
const { app } = require('../dist/app');

describe('Test protected endpoint without token', () => {
  test('[ GET /greeting ] should return 401', async () => {
    await request(app).get('/greeting').expect(401);
  });
});

describe('Test authentication', () => {
  const user = {
    email: 'test@test.ru',
    password: '123'
  };

  let accessToken = null;

  test('[ POST /auth/login ] should return JSON with accessToken', async () => {
    await request(app)
      .post('/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        accessToken = res.body.accessToken;
      });
  });

  test('[ GET /greeting ] should return 200', async () => {
    await request(app)
      .get('/greeting')
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
  });
});
