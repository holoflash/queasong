import { submitParty } from '../services/createParty';
import { usePartyId } from '../hooks/usePartyId'

export const CreateParty = () => {
    return (
        <>
            <div>{usePartyId()}</div>
            <button onClick={() => submitParty(
                {
                    host_name: "Billy Bob",
                    settings: {
                        number_of_members: 1,
                        songs_per_member: 10
                    },
                    members: [
                        {
                            name: "Billy Bob",
                            is_chossing: false,
                            is_done: false,
                            songs_suggested: 0
                        }
                    ],
                    suggestions: [],
                    songs_all_approve: []
                }
            )}>postParty</button>
        </>
    )
}