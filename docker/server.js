import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import Ajv from 'ajv';

dotenv.config();

const ajv = new Ajv();

// Define JSON schema for sock object
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
                forFoot: { type: 'string' }
            },
            required: ['size', 'color', 'pattern', 'material', 'condition', 'forFoot']
        },
        additionalFeatures: {
            type: 'object',
            properties: {
                waterResistant: { type: 'boolean' },
                padded: { type: 'boolean' },
                antiBacterial: { type: 'boolean' }
            },
            required: ['waterResistant', 'padded', 'antiBacterial']
        },
        addedTimestamp: { type: 'string' } // Assuming it's a string without a specific format
    },
    required: ['userId', 'sockDetails', 'additionalFeatures', 'addedTimestamp']
};

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

app.get('/api/socks', async (_req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        /**
         * Retrieves all socks from the collection.
         * @returns {Promise<Array>} A promise that resolves to an array of socks.
         */
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

app.get('/api/socks/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        limit = +limit; // The + converts limit from a string to integer.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        /**
         * Retrieves a specific page of socks from the collection.
         * @param {number} page - The page number.
         * @param {number} limit - The number of records to display on the page.
         * @returns {Promise<Array>} A promise that resolves to an array of socks.
         */
        const socks = await collection.find({}).skip((page - 1) * limit).limit(limit).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { name, email }  = req.body;
        console.log(req.body);
        if (name && email && name.trim() !== '' && email.trim() !== '') {
            res.status(201).send(`{"message":"success"}`);
        } else {
            res.status(400).send(`{"message":"Invalid user or email"}`);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding user');
    }
});

// Example using curl:
// curl -X POST -H "Content-Type: application/json" -d '{"searchTerm": "blue"}' http://localhost:3000/api/socks/search
app.post('/api/socks/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        /**
         * Searches for socks in the collection based on color.
         * @param {string} color - The color of the socks to search for.
         * @returns {Promise<Array>} A promise that resolves to an array of socks.
         */
        const socks = await collection.find({ 'sockDetails.color': regex }).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});

// Example using curl:
// curl -X POST -H "Content-Type: application/json" -d '{
//   "sock": {
//     "userId": "user8",
//     "sockDetails": {
//       "size": "Medium",
//       "color": "Pineapple Yellow",
//       "pattern": "Solid",
//       "material": "Cotton",
//       "condition": "New",
//       "forFoot": "Both"
//     },
//     "additionalFeatures": {
//       "waterResistant": true,
//       "padded": false,
//       "antiBacterial": true
//     },
//     "addedTimestamp": "2024-02-19T10:00:00Z"
//   }
// }' http://localhost:3000/api/socks
app.post('/api/socks', async (req, res) => {
    try {
        const sock = req.body;
        console.log(sock);
        // Validate the incoming JSON against the schema
        const valid = ajv.validate(sockSchema, sock);
        if (!valid) {
            console.error('Validation error:', ajv.errors);
            return res.status(400).json({ message: 'Invalid sock data' });
        }
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        /**
         * Adds a new sock document to the collection.
         * @param {object} sock - The sock object to be added.
         * @returns {Promise} A promise that resolves when the sock is added successfully.
         */
        const result = await collection.insertOne(sock);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});

// Example using curl:
// curl -X DELETE http://localhost:3000/api/socks/:id
app.delete('/api/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        /**
         * Deletes a sock document from the collection based on its _id value.
         * @param {string} id - The _id value of the sock document to delete.
         * @returns {Promise} A promise that resolves when the sock is deleted successfully.
         */
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).send('Sock deleted successfully');
        } else {
            res.status(404).send('Sock not found');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.get('/api/socks/count', async (_req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        /**
         * Retrieves the total number of sock documents in the collection.
         * @returns {Promise<number>} A promise that resolves to the total number of sock documents.
         */
        const count = await collection.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching sock count');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});