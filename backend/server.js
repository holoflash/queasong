import express from 'express'
import axios from 'axios'
import querystring from 'querystring'
import 'dotenv/config'
import { generateRandomString } from './generateRandomString.js'
import { db, connectToDb } from './db.js';

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const stateKey = 'spotify_auth_state'

const app = express()
app.use(express.json());
const port = 8888

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

app.get('/refresh_token', function (req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}` },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('/api/keys/view/', async (req, res) => {
    try {
        const results = await db.collection("queasong").find({ "KEYS": { $exists: true } }).toArray();
        res.send(results[0].KEYS).status(200);

    } catch (error) {
        res.status(500).json({ errorCode: 500, message: 'Internal server error' });
    }

});

app.put('/api/keys/update/', async (req, res) => {
    try {
        await db.collection("queasong").findOneAndReplace(
            { "KEYS": { $exists: true } },
            req.body
        )

        const results = await db.collection("queasong").find({ "KEYS": { $exists: true } }).toArray();
        res.send(results[0].KEYS).status(200);
    } catch (error) {
        res.status(500).json({ errorCode: 500, message: 'Internal server error' });
    }
})

//==== UPDATE DATABASE =====//
// app.put('/api/keys/push/', async (req, res) => {
//     try {
//         const result = await db.collection("queasong").insertOne(req.body);
//         res.send(result).status(204)
//     } catch (error) {
//         res.status(500).json({ errorCode: 500, message: 'Internal server error' });
//     }
// });

connectToDb(() => {
    console.log('Connected to database!');
    app.listen(port, () => {
        console.log('Listening on ' + port)
    })
})
