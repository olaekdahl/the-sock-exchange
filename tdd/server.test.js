// Import dependencies
const request = require('supertest');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Set up the express app and route
const app = express();

// Mock MongoDB client
jest.mock('mongodb', () => {
  const mockFind = jest.fn();
  mockFind.toArray = jest.fn(() => Promise.resolve(['sock1', 'sock2']));
  const mockCollection = { find: mockFind };
  const mockDb = { collection: () => mockCollection };
  return { MongoClient: { connect: jest.fn(() => Promise.resolve({ db: () => mockDb })) } };
});

app.get('/api/socks', async (_req, res) => {
    try {
        const client = await MongoClient.connect('url');
        const db = client.db('dbName');
        const collection = db.collection('collectionName');
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

// Test the route
describe('/api/socks', () => {
  test('should fetch all socks and return as json', async () => {
    const response = await request(app).get('/api/socks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['sock1', 'sock2']);
    expect(response.type).toBe('application/json');
  });

  test('should handle errors', async () => {
    // Mock error scenario by throwing an error in the collection.find method
    MongoClient.connect.mockImplementationOnce(() => {
      const error = new Error('Failed to connect');
      return Promise.reject(error);
    });

    const response = await request(app).get('/api/socks');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Hmm, something doesn\'t smell right... Error fetching socks');
  });
});