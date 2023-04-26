import express from 'express';
import { Party } from './partySchema.js';

const router = express.Router();

router.post('/api/party', async (req, res) => {
    try {
        const party = new Party(req.body)
        const result = await party.save();
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put('/api/party/:id/suggestions/:suggested_by', async (req, res) => {
    const { id, suggested_by } = req.params;

    try {
        const party = await Party.findOne({ _id: id });
        if (!party) {
            return res.status(404).json({ message: 'Party not found' });
        }

        await Party.updateOne(
            { _id: id, 'members.name': suggested_by },
            { $inc: { 'members.$.songs_to_suggest': -1 }, $set: { 'members.$.is_done': true } }
        );

        party.suggestions.push(req.body);
        await party.save();

        res.status(200).json({ message: 'Suggestion added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/party/:id', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ message: 'Party not found' });
        }
        res.json(party);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/api/party/:id', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ message: 'Party not found' });
        }
        await Party.findByIdAndDelete(req.params.id);
        res.json({ message: 'Party deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { router as mongoRouter };
