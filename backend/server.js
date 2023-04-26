import express from 'express'
import 'dotenv/config'
import { connectToDb } from './mongoAPI/db.js';
import { spotifyRouter } from './spotifyAPI/spotify.js'
import { mongoRouter } from './mongoAPI/mongo.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './build')));

const PORT = process.env.PORT || 8888


app.use('/', spotifyRouter);
app.use('/', mongoRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

connectToDb(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
        console.log('Listening on ' + PORT)
    })
})