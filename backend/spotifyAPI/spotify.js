import express, { response } from 'express';
import querystring from 'querystring';
import axios from 'axios';
import { generateRandomString } from './generateRandomString.js';

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const stateKey = 'spotify_auth_state';

router.get('/login', (req, res) => {
    try {
        const state = generateRandomString(16);
        res.cookie(stateKey, state);

        const scope = `playlist-modify-public`;

        const queryParams = querystring.stringify({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            state: state,
            scope: scope,
        });
        res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    const authHeader = `Basic ${base64Auth}`;

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
            Authorization: authHeader
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

                res.redirect(`${FRONTEND_URI}/?${queryParams}`);

            } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
            }
        })
        .catch(error => {
            res.send(error);
        });
});

router.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    const authHeader = `Basic ${base64Auth}`;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: authHeader
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

async function getAccessToken() {
    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    const authHeader = `Basic ${base64Auth}`;
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'client_credentials'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: authHeader
            }
        });
        return response.data.access_token;
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}

router.get('/api/spotify/user', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const data = response.data;
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//SPOTIFY song search
router.get('/api/search/:query', async (req, res) => {
    const query = req.params.query;
    const accessToken = await getAccessToken();
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=25`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            }
        });
        const data = response.data;
        res.json(data)
    } catch (err) {
        console.log(err)
    }
});

//SPOTIFY create a playlist
router.post('/api/create-playlist/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const token = req.headers.authorization.split(' ')[1];
    const body = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            data: body,
        });
        const data = response.data;
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//Add songs to playlist
router.post('/api/add-songs-to-playlist/:playlist_id', async (req, res) => {
    const playlist_id = req.params.playlist_id;
    const token = req.headers.authorization.split(' ')[1];
    const body = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            data: body,
        });
        const data = response.data;
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});


export { router as spotifyRouter };
