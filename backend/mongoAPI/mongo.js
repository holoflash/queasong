import express from 'express';
import { Party } from './partySchema.js';
import jwt from 'jsonwebtoken';
import { generateRandomString } from '../spotifyAPI/generateRandomString.js'

const router = express.Router();
const secretKey = generateRandomString(64);

router.post('/api/login', (req, res) => {
    try {
        const token = jwt.sign(
            { secretKey },
            secretKey,
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/api/party', verifyToken, async (req, res) => {
    try {
        const party = new Party(req.body)
        const result = await party.save();
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
});

router.put('/api/party/:id/suggestions/:suggested_by', async (req, res) => {
    const { id } = req.params;
    const suggested_by = encodeURIComponent(req.params.suggested_by);
    try {
        const party = await Party.findOne({ _id: id });
        await Party.updateOne(
            { _id: id, 'members.name': suggested_by },
            { $inc: { 'members.$.songs_to_suggest': -1 }, $set: { 'members.$.is_done': true } }
        );

        party.suggestions.push(req.body);
        await party.save();
        res.status(200).json({ message: 'Suggestion added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/party/:id', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        res.json(party);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/party/member/:id', async (req, res) => {
    try {
        const party = await Party.findOne({ 'members._id': req.params.id });
        res.json(party);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/api/party/delete/:id', verifyToken, async (req, res) => {
    try {
        await Party.findByIdAndDelete(req.params.id);
        res.json({ message: 'Party deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try {
            const decodedToken = jwt.verify(bearerToken, secretKey);
            req.token = decodedToken;
            next();
        } catch (err) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
}

export { router as mongoRouter };
