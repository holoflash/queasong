import mongoose from 'mongoose'
const { Schema, model } = mongoose;
mongoose.connect(process.env.ATLAS_URI)

const partySchema = new Schema(
    {
        host_name: {
            type: String,
            default: "Host"
        },
        party_title: {
            type: String,
            default: "Untitled Party"
        },
        settings: {
            number_of_members: {
                type: Number,
                default: 1
            },
            songs_per_member: {
                type: Number,
                default: 5
            },
        },
        members: [
            {
                name: {
                    type: String,
                    default: "Member"
                },
                is_done: {
                    type: Boolean,
                    default: false
                },
                songs_to_suggest: {
                    type: Number,
                }
            }
        ],
        suggestions: [
            {
                song_info: String,
                song_uri: String,
                approved_by: [String],
                suggested_by: String
            }
        ],
        songs_all_approve: [String],
        expire_at: { type: Date, default: Date.now, expires: 86400 }
    },
    { timestamps: true }
);

partySchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });

export const Party = model("party", partySchema);
