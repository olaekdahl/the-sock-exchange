import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import Ajv from 'ajv';
import { registerRoutes } from './routes/register.js';
import { sockRoutes } from './routes/socks.js';
import { testRoutes } from './routes/test.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const client = new MongoClient(url);

client.connect().then(() => {
  const db = client.db(dbName);
  app.locals.collection = db.collection(collectionName);
});

app.use(express.json());
app.use(cors());

app.use('/api/register', registerRoutes);
app.use('/api/socks', sockRoutes);
app.use('/api/test', testRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});