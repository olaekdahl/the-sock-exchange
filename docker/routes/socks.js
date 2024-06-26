import express from 'express';
import Ajv from 'ajv';
import { ObjectId } from 'mongodb';

const router = express.Router();
const ajv = new Ajv();

const sockSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    sockDetails: {
      type: 'object',
      properties: {
        size: { type: 'string' },
        color: { type: 'string' },
        pattern: { type: 'string' },
        material: { type: 'string' },
        condition: { type: 'string' },
        forFoot: { type: 'string' },
      },
      required: ['size', 'color', 'pattern', 'material', 'condition', 'forFoot'],
    },
    additionalFeatures: {
      type: 'object',
      properties: {
        waterResistant: { type: 'boolean' },
        padded: { type: 'boolean' },
        antiBacterial: { type: 'boolean' },
      },
      required: ['waterResistant', 'padded', 'antiBacterial'],
    },
    addedTimestamp: { type: 'string' },
  },
  required: ['userId', 'sockDetails', 'additionalFeatures', 'addedTimestamp'],
};

router.get('/', async (req, res, next) => {
  try {
    const collection = req.app.locals.collection;
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (err) {
    next(err);
  }
});

router.get('/:page/:limit', async (req, res, next) => {
  try {
    const { page, limit } = req.params;
    const collection = req.app.locals.collection;
    const socks = await collection
      .find({})
      .skip((page - 1) * limit)
      .limit(+limit)
      .toArray();
    res.json(socks);
  } catch (err) {
    next(err);
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const { searchTerm } = req.body;
    const collection = req.app.locals.collection;
    const regex = new RegExp(searchTerm, 'i');
    const socks = await collection.find({ 'sockDetails.color': regex }).toArray();
    res.json(socks);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const sock = req.body;
    const valid = ajv.validate(sockSchema, sock);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid sock data', errors: ajv.errors });
    }
    const collection = req.app.locals.collection;
    const result = await collection.insertOne(sock);
    res.status(201).json({ _id: result.insertedId });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = req.app.locals.collection;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Sock deleted successfully' });
    } else {
      res.status(404).json({ message: 'Sock not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/count', async (req, res, next) => {
  try {
    const collection = req.app.locals.collection;
    const count = await collection.countDocuments();
    res.json({ count });
  } catch (err) {
    next(err);
  }
});

export const sockRoutes = router;