import { getGreeting } from '../services/getGreeting';

export const Greeting = ({ profile }) => {
    const greeting = (profile) ? getGreeting(profile.country) : "Hello"
    return (
        <p className='greeting'>{greeting}</p>
    )


}