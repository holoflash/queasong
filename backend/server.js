import express from 'express'
import axios from 'axios'
import querystring from 'querystring'
import 'dotenv/config'
import { generateRandomString } from './generateRandomString.js'
import { db, connectToDb } from './db.js';
import { Party } from './PartySchema.js'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const stateKey = 'spotify_auth_state'

const app = express()
app.use(express.json());

const port = 8888

//////////////////////////////////////////
////////////=====SPOTIFY======////////////
//////////////////////////////////////////

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = "user-read-private user-read-email";

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;

                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in,
                });

                res.redirect(`http://localhost:3000/?${queryParams}`);

            } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
            }
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

//////////////////////////////////////////
////////////===MONGO ATLAS====////////////
//////////////////////////////////////////

app.post('/api/party', async (req, res) => {
    try {
        const party = new Party(req.body)
        const result = await party.save();
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })
    }
})

app.put('/api/party/:id/suggestions', async (req, res) => {
    const { id } = req.params

    try {
        const party = await Party.findOne({ _id: id });
        if (!party) {
            return res.status(404).json({ message: 'Party not found' });
        }
        party.suggestions.push(req.body)
        await party.save()
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


connectToDb(() => {
    console.log('Connected to database!');
    app.listen(port, () => {
        console.log('Listening on ' + port)
    })
})
