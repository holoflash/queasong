import mongoose from 'mongoose'
const { Schema, model } = mongoose;
mongoose.connect(process.env.ATLAS_URI)

const partySchema = new Schema(
    {
        host_name: {
            type: String,
            default: "host"
        },

        settings: {
            number_of_members: {
                type: Number,
                default: 1
            },
            songs_per_member: {
                type: Number,
                default: 10
            },
        },
        members: [
            {
                name: {
                    type: String,
                    default: "member"
                },
                is_choosing: {
                    type: Boolean,
                    default: false
                },
                is_done: {
                    type: Boolean,
                    default: false
                },
                songs_to_suggest: {
                    type: Number,
                    default: 0
                }
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