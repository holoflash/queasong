export const Greeting = ({ profile }) => {
    return (
        <>
            {profile && <h1>Hello {profile.display_name}!</h1>}
        </>
    );
};