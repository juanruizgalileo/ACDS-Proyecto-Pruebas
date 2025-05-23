const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  let userId;

  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Alice');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'Alice Updated' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Alice Updated');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});