import mongoose from 'mongoose'
const { Schema, model } = mongoose;
mongoose.connect(process.env.ATLAS_URI)

const partySchema = new Schema(
    {
        host_name: String,
        settings: {
            number_of_members: Number,
            songs_per_member: Number,
        },
        members: [
            {
                name: String,
                is_chossing: Boolean,
                is_done: Boolean,
                songs_suggested: Number
            }
        ],
        suggestions: [
            {
                song_info: String,
                song_url: String,
                approved_by: [String],
                suggested_by: String
            }
        ],
        songs_all_approve: [String],
    }
)

export const Party = model("party", partySchema)