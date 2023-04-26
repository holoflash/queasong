import { MongoClient } from 'mongodb';
import 'dotenv/config'

export async function connectToDb(cb) {
    try {
        const client = new MongoClient(process.env.ATLAS_URI);
        await client.connect();
        cb();
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
}