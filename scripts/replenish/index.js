import { MongoClient } from 'mongodb';

const mongoUri = 'mongodb://localhost:27017/';
const client = new MongoClient(mongoUri);

const dbName = 'tse';
const collectionName = 'socks';

// Se threshold
const threshold = 50;
const interval = 30 * 1000; // Check every 30 seconds

// Define the documents to be inserted when the threshold is reached
function createDocuments(numDocs) {
    const documents = [];
    for (let i = 0; i < numDocs; i++) {
        const doc = {
            userId: "user8",
            sockDetails: {
                size: "Medium",
                color: "Pineapple Yellow",
                pattern: "Solid",
                material: "Cotton",
                condition: "New",
                forFoot: "Both"
            },
            additionalFeatures: {
                waterResistant: "true",
                padded: "false",
                antiBacterial: "true"
            },
            addedTimestamp: "2024-02-19T10:00:00Z"
        };
        documents.push(doc);
    }
    return documents;
}

async function monitorAndInsert() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        while (true) {
            const documentCount = await collection.countDocuments();
            console.log(`Current document count: ${documentCount}`);

            if (documentCount < threshold) {
                const numDocsToAdd = threshold - documentCount;
                const newDocuments = createDocuments(numDocsToAdd);
                await collection.insertMany(newDocuments);
                console.log(`Inserted ${numDocsToAdd} new documents.`);
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

monitorAndInsert();