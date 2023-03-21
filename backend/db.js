import { MongoClient } from 'mongodb';
import 'dotenv/config'

let db;

async function connectToDb(cb) {
    const client = new MongoClient(process.env.ATLAS_URI);
    await client.connect();
    db = client.db('queasong');
    cb();
}

export {
    db,
    connectToDb,
};