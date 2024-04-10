import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

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
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});