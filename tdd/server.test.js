// Import dependencies
const request = require('supertest');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let app, mongoServer, db, collection;

beforeAll(async () => {
  console.log("Running beforeAll");
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();

  const client = new MongoClient(mongoUri);
  await client.connect();

  db = client.db('tse');
  collection = db.collection('socks');

  app = express();
  app.get('/api/socks', async (_req, res) => {
    try {
      const socks = await collection.find({}).toArray();
      res.json(socks);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
  });
});

afterAll(async () => {
  await mongoServer.stop();
});

describe('/api/socks', () => {
  test('should fetch all socks and return as json', async () => {
    await collection.insertMany(['sock1', 'sock2']);

    const response = await request(app).get('/api/socks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['sock1', 'sock2']);
    expect(response.type).toBe('application/json');
  });

  test('should handle errors', async () => {
    // Simulate an error by closing the MongoDB connection
    await db.close();
    MongoClient.connect.mockImplementationOnce(() => {
      const error = new Error('Failed to connect');
      return Promise.reject(error);
    });

    const response = await request(app).get('/api/socks');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Hmm, something doesn\'t smell right... Error fetching socks');
  });
});