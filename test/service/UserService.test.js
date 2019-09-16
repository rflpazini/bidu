const request = require('supertest');
const app = require('../../app');

const TestContainerHelper = require('./TestContainerHelper');

describe('User routes', () => {
  beforeAll(() => {
    TestContainerHelper.startPostgresContainer();
  });

  afterAll(done => {
    TestContainerHelper.stopPostgresContainer();
    app.close(done);
  });

  test('should return 200 on get all users', done => {
    request(app)
      .get('/users/all')
      .end((err, res) => {
        expect(res).not.toBeNull();
        done();
      });
  });
});
