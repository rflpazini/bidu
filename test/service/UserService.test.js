const request = require('supertest');
const { GenericContainer } = require('testcontainers');

describe('User routes', () => {
  jest.setTimeout(45000);

  let app = '';
  let container = '';
  let knex = '';

  beforeAll(async () => {
    container = await new GenericContainer('postgres', 'alpine')
      .withEnv('POSTGRES_USER', 'bidu')
      .withEnv('POSTGRES_PASSWORD', 'test')
      .withExposedPorts(5432)
      .start();

    process.env.DATABASE_URL = `postgres://bidu:test@${container.getContainerIpAddress()}:${container.getMappedPort(
      5432
    )}/bidu`;

    knex = require('knex')({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    });

    app = await require('../../app');

    await knex.migrate.latest();
  });

  afterAll(async (done) => {
    await knex.destroy();
    await container.stop();
    app.close(done);
  });

  test('should get all users', done => {
    request(app)
      .get('/v1.0/users/all')
      .end((err, res) => {
        expect(res).not.toBeNull();
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('should create a new user', done => {
    request(app)
      .post('/v1.0/users')
      .send({
        email: 'rflpazini@gmail.com',
        password: 'Sh3rl0ck',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.id).not.toBeNull();
        expect(res.body.email).toBe('rflpazini@gmail.com');
        done();
      });
  });

  test('should return 400 when try to create a user with an invalid email', done => {
    request(app)
      .post('/v1.0/users')
      .send({
        email: 'cacildis',
        password: 'Sh3rl0ck',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('Please provide a valid email');
        done();
      });
  });

  test('should return 400 when password is empty', done => {
    request(app)
      .post('/v1.0/users')
      .send({
        email: 'cacildis',
        password: '',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain(
          'Email and password must be provided'
        );
        done();
      });
  });

  test('should return 400 when email is empty', done => {
    request(app)
      .post('/v1.0/users')
      .send({
        email: '',
        password: '213123',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain(
          'Email and password must be provided'
        );
        done();
      });
  });

  test('should return 400 when user already exists', done => {
    request(app)
      .post('/v1.0/users')
      .send({
        email: 'rflpazini@gmail.com',
        password: 'Sh3rl0ck',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('User already exists');
        done();
      });
  });

  test('should return user info found by email', done => {
    request(app)
      .get('/v1.0/users?email=rflpazini@gmail.com')
      .end((err, res) => {
        expect(res).not.toBeNull();
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('email');
        done();
      });
  });

  test('should return 404 when user was not found', done => {
    request(app)
      .get('/v1.0/users?email=cacildis@gmail.com')
      .end((err, res) => {
        expect(res).not.toBeNull();
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User cacildis@gmail.com not found...');
        done();
      });
  });

  test('should delete user', done => {
    request(app)
      .delete('/v1.0/users')
      .send({
        email: 'rflpazini@gmail.com',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeNull();
        done();
      });
  });
});
