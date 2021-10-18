'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(server);

// This brings in the db for testing
const { db } = require('../src/auth/models/index');

// Mock data
let user = {
  username: 'Oreo',
  password: 'password'
}

// Syncs/Starts up db before starting
beforeAll(async () => {
  await db.sync();
});

// Drops/Stops db after testing is done
afterAll(async () => {
  await db.drop();
});

describe('Route Testing', () => {

  it('should create a new user', async () => {
    const response = await mockReq.post('/signup').send(user);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
  });

  xit('should be able to sign in', async () => {
    const response = await mockReq.post('/signin').send(user);
    console.log('inside signin', response.body);
    // expect(response.status).toBe(200);
  });

});
