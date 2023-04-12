import { MongoClient } from 'mongodb';
import 'dotenv/config'

export async function connectToDb(cb) {
    const client = new MongoClient(process.env.ATLAS_URI);
    await client.connect();
    cb();
}