const request = require('supertest');
const app = require('../../app');

describe('Basic routes', () => {
  afterAll(done => {
    app.close(done);
  });

  test('should return 200 ping route', done => {
    request(app)
      .get('/ping')
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('pong');
        done();
      });
  });
});
