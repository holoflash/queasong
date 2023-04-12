import express from 'express'
import 'dotenv/config'
import { connectToDb } from './mongoAPI/db.js';
import { spotifyRouter } from './spotifyAPI/spotify.js'
import { mongoRouter } from './mongoAPI/mongo.js';

const app = express()
app.use(express.json());

const port = 8888

app.use('/', spotifyRouter);
app.use('/', mongoRouter);

connectToDb(() => {
    console.log('Connected to database!');
    app.listen(port, () => {
        console.log('Listening on ' + port)
    })
})