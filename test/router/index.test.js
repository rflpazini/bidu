const request = require('supertest');
const app = require('../../app');

describe('Basic routes', () => {
  test('should respond ping route', done => {
    request(app)
      .get('/ping')
      .end((err, res) => {
        expect(res.text).toEqual('pong');
        done();
      });
  });
});
