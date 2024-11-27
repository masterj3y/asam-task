import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { fastify } from '../src/server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }

  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
  await fastify.ready();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await fastify.close();
});

describe('JWT Auth Endpoints', () => {
  test('should register a user', async () => {
    const response = await supertest(fastify.server)
      .post('/api/v1/auth/signup')
      .send({ email: 'email@test.com', password: 'password123', name: 'test' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('should login and return a token', async () => {
    await supertest(fastify.server)
      .post('/api/v1/auth/signup')
      .send({ email: 'email@test.com', password: 'password123', name: 'test' });

    const response = await supertest(fastify.server)
      .post('/api/v1/auth/login')
      .send({ email: 'email@test.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should access protected route with valid token', async () => {
    const loginResponse = await supertest(fastify.server)
      .post('/api/v1/auth/signup')
      .send({ email: 'email2@test.com', password: 'password123', name: 'test' });
    const token = loginResponse.body.token;

    const response = await supertest(fastify.server)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('should deny access to protected route with invalid token', async () => {
    const response = await supertest(fastify.server)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(401);
  });
});
